import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { discoverSkills, validateSkill, scanTree, validateHub } from './validate-skills.mjs';

const sections = ['Core Constraints', 'Execution Protocol', 'Failure Modes / What NOT to Do', 'Verification Gate'];
const valid = (description = 'Recover task state.') => `---\nname: sample-skill\ndescription: ${description}\n---\n# Sample\n\n${sections.map(name => `## ${name}\n\nPerform a bounded check.\n`).join('\n')}`;

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'runbook-validation-'));
  try {
    const dir = join(root, 'skills', 'engineering', 'sample-skill');
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'SKILL.md'), valid());
    await run({ root, dir, set: content => writeFile(join(dir, 'SKILL.md'), content) });
  } finally { await rm(root, { recursive: true, force: true }); }
}

test('discover domain skills and accept plain, quoted, and block descriptions', () => fixture(async ({ root, dir, set }) => {
  assert.deepEqual(await discoverSkills(join(root, 'skills')), [dir]);
  for (const description of ['Recover task state.', '"Recover: task state."', "'Recover task state.'", '>-\n  Recover task\n  state.', '|-\n  Recover state.']) {
    await set(valid(description));
    assert.deepEqual(await validateSkill(dir), []);
  }
}));

test('accept 1024 characters; reject empty and 1025-character descriptions', () => fixture(async ({ dir, set }) => {
  await set(valid('x'.repeat(1024)));
  assert.deepEqual(await validateSkill(dir), []);
  for (const value of ['""', 'x'.repeat(1025)]) {
    await set(valid(value));
    assert.ok((await validateSkill(dir)).length);
  }
}));

test('reject malformed, duplicate, complex, non-string, and mismatched metadata', () => fixture(async ({ dir, set }) => {
  const inputs = [
    valid().replace('name: sample-skill', 'name: other-skill'),
    valid().replace('name: sample-skill', 'name: sample-skill\nname: sample-skill'),
    valid('true'), valid('true # comment'), valid('123'), valid('[one, two]'), valid('*alias'),
    valid('>-\n  First line\n second line'), valid('>-\n\tInvalid indentation'),
    valid('"unterminated'), valid('invalid: value'),
    valid().replace('description:', 'metadata: extra\ndescription:'),
    valid().replace(/^---/, ''), '\uFEFF' + valid(),
  ];
  for (const input of inputs) {
    await set(input);
    assert.ok((await validateSkill(dir)).length);
  }
}));

test('reject missing, empty, commented-only, and fenced-only required headings', () => fixture(async ({ dir, set }) => {
  for (const replacement of ['', '## Verification Gate\n', '## Verification Gate\n<!-- pending -->\n', '```md\n## Verification Gate\nContent\n```\n']) {
    await set(valid().replace('## Verification Gate\n\nPerform a bounded check.\n', replacement));
    assert.ok((await validateSkill(dir)).some(error => error.includes('Verification Gate')));
  }
}));

test('scan support files without exposing matched payloads', () => fixture(async ({ root, dir }) => {
  const token = ['gh', 'p_', 'A'.repeat(36)].join('');
  await writeFile(join(dir, 'reference.txt'), token);
  const errors = await scanTree(root);
  assert.ok(errors.some(error => error.includes('GitHub token')));
  assert.ok(errors.every(error => !error.includes(token)));
}));

test('reject sensitive filenames, binary payloads, and real-looking personal data', () => fixture(async ({ root, dir }) => {
  await writeFile(join(dir, '.env'), 'synthetic fixture');
  await writeFile(join(dir, 'blob.bin'), Buffer.from([0, 1, 2]));
  await writeFile(join(dir, 'contact.txt'), ['person', '@', 'invalid.test'].join(''));
  const errors = await scanTree(root);
  assert.ok(errors.some(error => error.includes('sensitive filename')));
  assert.ok(errors.some(error => error.includes('binary content')));
  assert.ok(errors.some(error => error.includes('email address')));
}));

test('reject flattened layout', () => fixture(async ({ root }) => {
  await mkdir(join(root, 'skills', 'flat-skill'));
  await writeFile(join(root, 'skills', 'flat-skill', 'SKILL.md'), valid());
  await assert.rejects(discoverSkills(join(root, 'skills')));
}));

test('reject duplicate slugs across domains', context => fixture(async ({ root }) => {
  const second = join(root, 'skills', 'architecture', 'sample-skill');
  await mkdir(second, { recursive: true });
  await writeFile(join(second, 'SKILL.md'), valid());
  context.mock.method(console, 'log', () => {});
  context.mock.method(console, 'error', () => {});
  assert.equal(await validateHub(root), false);
}));

test('reject symlinks without following them', { skip: process.platform === 'win32' }, () => fixture(async ({ root, dir }) => {
  await symlink(join(dir, 'SKILL.md'), join(dir, 'linked.md'));
  assert.ok((await scanTree(root)).some(error => error.includes('symlink')));
}));

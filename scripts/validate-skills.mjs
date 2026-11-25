#!/usr/bin/env node
import { readdir, readFile, lstat } from 'node:fs/promises';
import { resolve, join, basename, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const headings = ['Core Constraints', 'Execution Protocol', 'Failure Modes / What NOT to Do', 'Verification Gate'];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ignored = new Set(['.git', 'node_modules']);
const forbidden = /^(?:\.env(?:\..*)?|id_(?:rsa|ed25519)|credentials(?:\..*)?|.*\.(?:pem|p12|pfx|key|zip))$/i;
const signals = [
  ['private key', /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/],
  ['cloud access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['API token', /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ['assigned credential', /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][A-Za-z0-9_+\/-]{16,}["']/i],
  ['URL credential', /[a-z][a-z0-9+.-]*:\/\/[^\s/@:]+:[^\s/@]+@/i],
  ['email address', /\b[A-Z0-9._%+-]+@(?!example\.(?:com|org|net)\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['phone number', /(?:\+\d{1,3}[ .-])?\(\d{3}\)[ .-]\d{3}[ .-]\d{4}\b/],
  ['personal home path', /(?:[A-Z]:[\\/]Users[\\/](?!<|\$)[A-Za-z0-9_.-]+|\/home\/(?!<|\$)[A-Za-z0-9_.-]+)[\\/]/i],
  ['US social security number', /\b\d{3}-\d{2}-\d{4}\b/],
  ['Indonesian identity number', /\b(?:NIK|KTP)\s*[:=]\s*["']?\d{16}\b/i],
  ['private endpoint', /https?:\/\/(?:localhost|127\.0\.0\.1|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(?=[:/\s]|$)/i],
];

function scalar(raw) {
  let value = raw.trim();
  if (/^"(?:[^"\\]|\\.)*"$/.test(value)) { try { return JSON.parse(value); } catch { throw new Error('invalid quoted YAML scalar'); } }
  if (/^'(?:[^']|'')*'$/.test(value)) return value.slice(1, -1).replace(/''/g, "'");
  value = value.replace(/\s+#.*$/, '').trim();
  if (!value || /^#|^[-?:](?:\s|$)/.test(value)) throw new Error('empty/invalid YAML scalar');
  if (/^[\[\]{}!&*]|^(?:null|true|false|~)$/i.test(value)) throw new Error('unsupported/non-string YAML scalar');
  if (/^[\"'`@%>|]/.test(value) || /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) || /:(?:\s|$)|[\[\]{}]/.test(value)) throw new Error('unsupported YAML scalar');
  return value;
}

function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) throw new Error('missing YAML frontmatter');
  const data = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const entry = /^([A-Za-z_][\w-]*):(?:\s+(.*))?$/.exec(line);
    if (!entry) throw new Error(`invalid YAML line ${i + 1}`);
    const [, key, raw = ''] = entry;
    if (Object.hasOwn(data, key)) throw new Error(`duplicate YAML key ${key}`);
    if (raw === '>' || raw === '>-' || raw === '|' || raw === '|-') {
      const block = [];
      let indentation;
      while (i + 1 < lines.length && (/^\s+/.test(lines[i + 1]) || !lines[i + 1].trim())) {
        const next = lines[++i];
        if (next.trim()) {
          if (/^ *\t/.test(next)) throw new Error('tabs are not YAML indentation');
          const spaces = /^ */.exec(next)[0].length;
          indentation ??= spaces;
          if (spaces !== indentation) throw new Error('use consistent block indentation');
        }
        block.push(next.trim());
      }
      if (!block.some(Boolean)) throw new Error(`empty YAML block ${key}`);
      data[key] = block.join(raw.startsWith('>') ? ' ' : '\n').trim();
    } else {
      if (!raw.trim()) throw new Error(`empty YAML value ${key}`);
      data[key] = scalar(raw);
    }
  }
  return { data, body: text.slice(match[0].length) };
}


export async function discoverSkills(root, grouped = true) {
  const result = [];
  for (const entry of (await readdir(root, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.')) continue;
    if (!entry.isDirectory() || entry.isSymbolicLink()) throw new Error('invalid skill directory entry');
    if (!slugPattern.test(entry.name)) throw new Error('invalid domain/slug name');
    const path = join(root, entry.name);
    if (grouped) result.push(...await discoverSkills(path, false));
    else result.push(path);
  }
  return result;
}

export async function validateSkill(dir) {
  const errors = [];
  const slug = basename(dir);
  try {
    const skillFile = join(dir, 'SKILL.md');
    if (!(await lstat(skillFile)).isFile()) throw new Error('SKILL.md must be a regular file');
    const content = await readFile(skillFile, 'utf8');
    const { data, body } = frontmatter(content);
    if (!slugPattern.test(slug) || slug.length > 64 || data.name !== slug) errors.push('name must match kebab-case directory slug (1-64 characters)');
    if (Object.keys(data).some(key => !['name', 'description'].includes(key))) errors.push('unsupported frontmatter field');
    if (typeof data.description !== 'string' || !data.description.trim() || [...data.description].length > 1024) errors.push('description must contain 1-1024 characters');
    const unfenced = body.replace(/^([`~]{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '');
    for (const heading of headings) {
      const sections = [...unfenced.matchAll(/^## (.+)\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
      const section = sections.find(match => match[1].trim() === heading);
      if (!section || !section[2].replace(/<!--[^]*?-->/g, '').trim()) errors.push(`missing/empty heading: ${heading}`);
    }
  } catch (error) { errors.push(error.code ? 'missing/unreadable SKILL.md' : error.message); }
  return errors;
}

export async function scanTree(root) {
  const errors = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const path = join(dir, entry.name);
      const label = relative(root, path);
      if (entry.isSymbolicLink()) { errors.push(`${label}: symlinks are prohibited`); continue; }
      if (entry.name === 'dist' || forbidden.test(entry.name)) { errors.push(`${label}: prohibited artifact/sensitive filename`); continue; }
      if (entry.isDirectory()) { await walk(path); continue; }
      if (!entry.isFile()) { errors.push(`${label}: unsupported file type`); continue; }
      const buffer = await readFile(path);
      if (buffer.includes(0)) { errors.push(`${label}: binary content requires manual audit; remove from source tree`); continue; }
      const content = buffer.toString('utf8');
      for (const [name, pattern] of signals) if (pattern.test(content)) errors.push(`${label}: possible ${name}`);
    }
  }
  await walk(root);
  return errors;
}

export async function validateHub(root) {
  let dirs;
  try { dirs = await discoverSkills(join(root, 'skills')); }
  catch { console.error('FAIL | skill layout unreadable or invalid'); return false; }
  const seen = new Set();
  let failed = false;
  for (const dir of dirs) {
    const errors = await validateSkill(dir);
    const slug = basename(dir);
    if (seen.has(slug)) errors.push('duplicate slug');
    seen.add(slug);
    console.log(`${errors.length ? 'FAIL' : 'PASS'} | ${relative(root, dir)} | ${errors.join('; ') || 'metadata and headings'}`);
    failed ||= errors.length > 0;
  }
  if (!dirs.length) { console.error('FAIL | no skills found'); failed = true; }
  for (const error of await scanTree(root)) { console.error(`FAIL | ${error}`); failed = true; }
  console.log(`${failed ? 'FAIL' : 'PASS'} | ${dirs.length} skills | static secret/PII scan (manual review also required)`);
  return !failed;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  try { if (!await validateHub(root)) process.exitCode = 1; }
  catch { console.error('FAIL | repository scan could not complete'); process.exitCode = 1; }
}

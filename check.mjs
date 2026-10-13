import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../dist');
let fileCount = 0, localReferences = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    fileCount++;
    if (entry.name.endsWith('.js')) execFileSync(process.execPath, ['--check', file]);
    if (!/\.(html|js|css)$/.test(entry.name)) continue;
    const text = await readFile(file, 'utf8');
    let refs = [];
    if (entry.name.endsWith('.html')) refs = [...text.matchAll(/(?:href|src)="(\/[^"#]+)"/g)].map(x => x[1]);
    if (entry.name.endsWith('.css')) refs = [...text.matchAll(/url\(["']?(\/[^)'"\s]+)["']?\)/g)].map(x => x[1]);
    if (entry.name.endsWith('.js')) {
      refs.push(...[...text.matchAll(/from\s*["'](\.[^"']+)["']/g)].map(x=>path.relative(root,path.resolve(path.dirname(file),x[1]))).map(x=>'/' + x));
      refs.push(...[...text.matchAll(/["'`](\/images\/[^"'`]+\.(?:png|jpg|svg))["'`]/g)].map(x=>x[1]));
    }
    for (const ref of refs) { await stat(path.join(root, decodeURIComponent(ref.split('?')[0]))); localReferences++; }
    if (/https?:\/\/custom-images\.strikinglycdn\.com/.test(text)) throw new Error(`External photo dependency: ${file}`);
  }
}
await walk(root);
for (const page of ['index.html','privacy/index.html','terms/index.html','cookies/index.html','accessibility/index.html']) await stat(path.join(root,page));
const modules = await import('../dist/assets/framework-DjPHiq1u.js');
if (typeof modules.i().createElement !== 'function' || typeof modules.t().hydrateRoot !== 'function') throw new Error('React runtime missing');
console.log(`PASS: ${fileCount} files; ${localReferences} local references; five pages; JavaScript syntax and React runtime.`);

import { cp, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
await rm(path.join(root, 'dist'), { recursive: true, force: true });
await cp(path.join(root, 'public'), path.join(root, 'dist'), { recursive: true });
const base = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || '').replace(/\/$/, '');
async function metadata(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await metadata(file);
    else if (entry.name.endsWith('.html') && base) {
      let html = await readFile(file, 'utf8');
      html = html.replaceAll('content="/images/obe-share-cover-v2.jpg"', `content="${base}/images/obe-share-cover-v2.jpg"`);
      const route = path.relative(path.join(root, 'dist'), file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
      const url = base + '/' + route;
      html = html.replace('</head>', `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/></head>`);
      await writeFile(file, html);
    }
  }
}
await metadata(path.join(root, 'dist'));
console.log('Build complete: dist/ — all site resources are local.');

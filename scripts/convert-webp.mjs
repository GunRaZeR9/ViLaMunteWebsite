import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const QUALITY = 85;

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) { walk(full); continue; }
    const ext = extname(f).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      const out = join(dir, basename(f, extname(f)) + '.webp');
      sharp(full)
        .webp({ quality: QUALITY })
        .toFile(out)
        .then(() => console.log('converted →', out))
        .catch(e => console.error('failed:', f, e.message));
    }
  }
}

walk('src/assets/images');

import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const QUALITY_CONVERT = 85;   // for jpg→webp conversion
const QUALITY_REENC   = 75;   // for re-encoding oversized WebPs
const MAX_WIDTH       = 1920; // px — cap for re-encoded WebPs
const SRCSET_WIDTH    = 820;  // px — narrow variant for srcset
const OVERSIZE_BYTES  = 500 * 1024; // 500 KB

const manifest = [];

function sizeLabel(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function processFile(full) {
  const ext = extname(full).toLowerCase();
  const name = basename(full, extname(full));
  const dir  = full.slice(0, full.length - basename(full).length);

  // --- jpg/jpeg → webp ---
  if (ext === '.jpg' || ext === '.jpeg') {
    const out = join(dir, name + '.webp');
    await sharp(full).webp({ quality: QUALITY_CONVERT }).toFile(out);
    console.log('converted →', out);
    return;
  }

  // --- webp: re-encode if oversized + generate 820w srcset variant ---
  if (ext === '.webp') {
    const before = statSync(full).size;
    const meta   = await sharp(full).metadata();

    // Re-encode large files at lower quality / capped width
    if (before > OVERSIZE_BYTES) {
      const tmp = full + '.tmp.webp';
      await sharp(full)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY_REENC })
        .toFile(tmp);
      const after = statSync(tmp).size;
      // Replace original only if we actually shrank it
      if (after < before) {
        const { renameSync } = await import('fs');
        renameSync(tmp, full);
        manifest.push({ file: full, before: sizeLabel(before), after: sizeLabel(after), saved: sizeLabel(before - after) });
        console.log(`re-encoded  → ${full}  (${sizeLabel(before)} → ${sizeLabel(after)})`);
      } else {
        const { unlinkSync } = await import('fs');
        unlinkSync(tmp);
      }
    }

    // Generate 820w srcset variant (skip if original is already ≤ 820px)
    if ((meta.width ?? 0) > SRCSET_WIDTH) {
      const srcsetOut = join(dir, `${name}-820w.webp`);
      // Don't overwrite if it already exists and is up-to-date
      try {
        const existing = statSync(srcsetOut);
        const original = statSync(full);
        if (existing.mtimeMs >= original.mtimeMs) return; // up-to-date
      } catch { /* srcset file doesn't exist yet — create it */ }

      await sharp(full)
        .resize({ width: SRCSET_WIDTH })
        .webp({ quality: QUALITY_REENC })
        .toFile(srcsetOut);
      console.log(`srcset      → ${srcsetOut}`);
    }
  }
}

async function walk(dir) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) { await walk(full); continue; }
    // Skip already-generated srcset variants to avoid re-processing
    if (f.endsWith('-820w.webp')) continue;
    const ext = extname(f).toLowerCase();
    if (['.jpg', '.jpeg', '.webp'].includes(ext)) {
      await processFile(full).catch(e => console.error('failed:', f, e.message));
    }
  }
}

await walk('src/assets/images');

if (manifest.length > 0) {
  console.log('\n--- Re-encoding manifest ---');
  for (const { file, before, after, saved } of manifest) {
    console.log(`  ${file}: ${before} → ${after}  (saved ${saved})`);
  }
} else {
  console.log('\nNo oversized WebPs found — all images are already ≤ 500 KB.');
}

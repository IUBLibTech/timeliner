#!/usr/bin/env node
/**
 * Patch 1: Delete the nested ws@7 from docz-core and let Node resolution of ws to fall-back to
 * the top-level ws@6 in node_modules. This avoids ws@7's argument validation that rejects docz-core's
 * WebSocketServer usage, while still allowing docz to use ws for live-reload in dev mode.
 */
const fs = require('fs');
const path = require('path');

const nestedWsPath = path.join(__dirname, '../node_modules/docz-core/node_modules/ws');
if (fs.existsSync(nestedWsPath)) {
  fs.rmSync(nestedWsPath, { recursive: true, force: true });
  console.log('Removed nested docz-core/node_modules/ws (ws@7) — will fall back to top-level ws@6');
} else {
  console.log('docz-core/node_modules/ws not present, no action needed');
}

/**
 * Patch 2: Restore safeLoad/safeDump compatibility aliases to js-yaml@4.
 * 'remark-parse-yaml' used by docz still calls 'safeLoad', this replaces the
 * stubs with real function references.
 */
const indexPath = path.join(__dirname, '../node_modules/js-yaml/index.js');
if (!fs.existsSync(indexPath)) {
  console.log('js-yaml not found, skipping patch');
  process.exit(0);
}

const content = fs.readFileSync(indexPath, 'utf8');

if (content.includes("renamed('safeLoad'")) {
  const patched = content
    .replace(
      /module\.exports\.safeLoad\s*=\s*renamed\('safeLoad',\s*'load'\);/,
      "module.exports.safeLoad            = loader.load;"
    )
    .replace(
      /module\.exports\.safeLoadAll\s*=\s*renamed\('safeLoadAll',\s*'loadAll'\);/,
      "module.exports.safeLoadAll         = loader.loadAll;"
    )
    .replace(
      /module\.exports\.safeDump\s*=\s*renamed\('safeDump',\s*'dump'\);/,
      "module.exports.safeDump            = dumper.dump;"
    );
  fs.writeFileSync(indexPath, patched, 'utf8');
  console.log('js-yaml patched: safeLoad/safeDump restored as aliases for load/dump');
} else {
  console.log('js-yaml already patched or unexpected format, skipping');
}

/**
 * Patch 3: Replace the hardcoded "Built with docz" footer link in docz-theme-default.
 */
for (const themeFile of ['index.js', 'index.esm.js']) {
  const themeDefaultPath = path.join(__dirname, `../node_modules/docz-theme-default/dist/${themeFile}`);
  if (fs.existsSync(themeDefaultPath)) {
    const themeContent = fs.readFileSync(themeDefaultPath, 'utf8');
    if (themeContent.includes('href: "https://docz.site"')) {
      const themePatched = themeContent.replace(
        'href: "https://docz.site"',
        'href: "https://github.com/doczjs/docz"'
      );
      fs.writeFileSync(themeDefaultPath, themePatched, 'utf8');
      console.log(`docz-theme-default ${themeFile} patched: footer link updated`);
    } else {
      console.log(`docz-theme-default ${themeFile} footer link already patched`);
    }
  } else {
    console.log(`docz-theme-default ${themeFile} not found, skipping footer patch`);
  }
}

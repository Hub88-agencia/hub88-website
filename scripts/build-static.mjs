// Pós-build: gera um site estático puro (index.html + assets) em dist/static
// para hospedagem em qualquer host estático (Vercel, Netlify, GitHub Pages...).
import { mkdir, copyFile, readdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const clientDir = join(root, "dist", "client");
const outDir = join(root, "dist", "static");

if (!existsSync(clientDir)) {
  console.error("dist/client não existe. Rode `vite build` antes.");
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

// Copia recursiva de assets do client
async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  for (const entry of await readdir(src, { withFileTypes: true })) {
    const s = join(src, entry.name);
    const d = join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await copyFile(s, d);
  }
}
await copyDir(clientDir, outDir);

// Localiza o CSS gerado
const assetsDir = join(outDir, "assets");
const assetFiles = await readdir(assetsDir);
const cssFile = assetFiles.find((f) => f.endsWith(".css"));
const logoFile = assetFiles.find((f) => f.startsWith("hub88-logo"));

// Renderiza o componente Index para HTML estático via tsx loader
const { tsImport } = await import("tsx/esm/api");
const indexModule = await tsImport(
  pathToFileURL(join(root, "src/static-page.tsx")).href,
  import.meta.url,
);
const html = renderToStaticMarkup(
  React.createElement(indexModule.default, { logoSrc: `/assets/${logoFile}` }),
);

const fullHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hub88 — Em Construção</title>
    <meta name="description" content="O site Hub88 está em construção. Em breve, novidades incríveis!" />
    <meta name="author" content="Hub88" />
    <meta property="og:title" content="Hub88 — Em Construção" />
    <meta property="og:description" content="O site Hub88 está em construção. Em breve, novidades incríveis!" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Hub88 — Em Construção" />
    <meta name="twitter:description" content="O site Hub88 está em construção. Em breve, novidades incríveis!" />
    <link rel="icon" href="/favicon.ico" />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>${html}</body>
</html>
`;

await writeFile(join(outDir, "index.html"), fullHtml, "utf8");
console.log(`✓ Site estático gerado em ${outDir}`);

const fs = require("node:fs");
const path = require("node:path");

const targetFile = path.join(
  __dirname,
  "..",
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "build",
  "patches",
  "plugins",
  "load-manifest.js"
);

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, "utf8");
  let modified = false;

  // 1. Ensure preview-props is included in manifests glob
  if (
    content.includes("**/{*-manifest,required-server-files,prefetch-hints}.json") &&
    !content.includes("preview-props}.json")
  ) {
    content = content.replace(
      "**/{*-manifest,required-server-files,prefetch-hints}.json",
      "**/{*-manifest,required-server-files,prefetch-hints,preview-props}.json"
    );
    modified = true;
  }

  // 2. Ensure preview-props is in the fallback allowed list
  if (
    content.includes('p.endsWith("prefetch-hints"))') &&
    !content.includes('p.endsWith("preview-props"))')
  ) {
    content = content.replace(
      'p.endsWith("prefetch-hints"))',
      'p.endsWith("prefetch-hints") ||\n        p.endsWith("preview-props"))'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(targetFile, content, "utf8");
    console.log("Successfully patched @opennextjs/cloudflare for preview-props.json support.");
  } else {
    console.log("@opennextjs/cloudflare already patched or up-to-date.");
  }
} else {
  console.log("Target load-manifest.js not found in node_modules, skipping patch.");
}


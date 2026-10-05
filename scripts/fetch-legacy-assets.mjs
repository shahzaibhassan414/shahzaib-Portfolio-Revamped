// Downloads the project images from the current Flutter Web site so the new
// build has something real to show until fresh screenshots are added.
// Run from the project root:  node scripts/fetch-legacy-assets.mjs
//
// These are marketing mockups, not real app screens. Replace them with actual
// screenshots in public/work/<slug>/ before launch.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const BASE = "https://www.shahzaib-dev.site/assets/assets/projects";

const files = {
  "on-scene/legacy-cover.png": "project_onscene.png",
  "paw-play-love/legacy-cover.png": "project_ppl.png",
  "simman/legacy-cover.png": "project_simman.png",
  "bepay/legacy-cover-client.png": "project_bepay_client.png",
  "bepay/legacy-cover-business.png": "project_bepay_business.png",
  "lawnolu/legacy-cover.png": "project_lawnolu.png",
  "zera/legacy-cover.png": "project_zera.png",
  "jatt-app/legacy-cover.png": "project_jatt.png",
};

for (const [target, source] of Object.entries(files)) {
  const url = `${BASE}/${source}`;
  const out = `public/work/${target}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, Buffer.from(await res.arrayBuffer()));
    console.log(`saved ${out}`);
  } catch (err) {
    console.warn(`skipped ${url}: ${err.message}`);
  }
}

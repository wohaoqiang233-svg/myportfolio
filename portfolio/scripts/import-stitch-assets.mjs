// Imports only images referenced by the supplied Stitch export; never executes its HTML.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(
  "../设计资料/stitch-export-v1/stitch_ux_portfolio_wireframe_architecture",
);
const pages = {
  home: "home_sun_jiachen_vision_draft_1",
  reclimb: "project_reclimb_vision_draft_1",
  food: "project_reduce_food_waste_vision_draft_1",
  judge: "project_no_judge_vision_draft_1",
  plant: "project_plantfun_explorer_vision_draft_1",
};
await mkdir("public/assets/stitch", { recursive: true });
const manifest = {};
for (const [key, folder] of Object.entries(pages)) {
  const html = await readFile(resolve(root, folder, "code.html"), "utf8");
  const urls = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(
    (m) => m[1],
  );
  manifest[key] = [];
  for (const [i, url] of urls.entries()) {
    if (!url.startsWith("https://lh3.googleusercontent.com/"))
      throw new Error("Unexpected asset host");
    const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`${key}-${i}: ${response.status}`);
    const type = response.headers.get("content-type") || "";
    if (!type.startsWith("image/")) throw new Error(`Not an image: ${type}`);
    const ext = type.includes("png")
      ? "png"
      : type.includes("webp")
        ? "webp"
        : "jpg";
    const path = `/assets/stitch/${key}-${i + 1}.${ext}`;
    await writeFile(`public${path}`, Buffer.from(await response.arrayBuffer()));
    manifest[key].push(path);
    console.log(`${key} ${i + 1}/${urls.length}: saved`);
  }
}
await writeFile(
  "src/content/stitch-assets.json",
  JSON.stringify(manifest, null, 2) + "\n",
);

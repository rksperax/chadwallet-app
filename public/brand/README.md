# ChadWallet brand assets

Official ChadWallet logo assets used across the web app.

| File | What it is | Used where |
| --- | --- | --- |
| `logo-mark.png` | White chad mark on **transparent** background (derived from `logo-dark.png`) | Navbar, footer, Privy login modal (`components/layout/Logo.tsx`) |
| `logo-dark.png` | White chad on black square | Source for the transparent mark + favicon |
| `logo-light.png` | Black chad on white square | Use on light surfaces if needed |
| `../../app/icon.png` | 256px favicon (resized from `logo-dark.png`) | Browser tab icon |

## Regenerating the transparent mark

`logo-mark.png` is generated from `logo-dark.png` by mapping luminance → alpha
(black background becomes transparent, white line-art stays). To regenerate after
replacing `logo-dark.png`:

```js
// node (with `npm i --no-save pngjs`), run from the project root
const fs = require("fs");
const { PNG } = require("pngjs");
const src = PNG.sync.read(fs.readFileSync("public/brand/logo-dark.png"));
const out = new PNG({ width: src.width, height: src.height });
for (let i = 0; i < src.data.length; i += 4) {
  const lum = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
  out.data[i] = out.data[i + 1] = out.data[i + 2] = 255;
  out.data[i + 3] = Math.round(lum);
}
fs.writeFileSync("public/brand/logo-mark.png", PNG.sync.write(out));
```

Then `sips -z 256 256 public/brand/logo-dark.png --out app/icon.png` for the favicon.

## Colors

Brand colors live in `app/globals.css` under `:root` (`--primary`, `--accent`,
`--background`, …). Everything themes off those.

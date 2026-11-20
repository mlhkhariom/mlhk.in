import test from "node:test";
import assert from "node:assert/strict";
import cloudflareStaticImageLoader, { resolveStaticImageSrc } from "./image-loader";

test("custom image loader returns direct static asset paths with width query and never /_next/image", () => {
  const out = cloudflareStaticImageLoader({
    src: "/images/showcase/case-iksc.jpg",
    width: 828,
    quality: 75,
  });
  assert.equal(out, "/images/showcase/case-iksc.jpg?w=828");
  assert.equal(out.includes("/_next/image"), false);
});

test("custom image loader normalizes relative paths without leading slash", () => {
  assert.equal(
    resolveStaticImageSrc("images/showcase/mobile-app.jpg", 640),
    "/images/showcase/mobile-app.jpg?w=640",
  );
  assert.equal(resolveStaticImageSrc("/brand/badge.png"), "/brand/badge.png");
});

test("custom image loader preserves absolute https and data URLs", () => {
  assert.equal(
    resolveStaticImageSrc("https://mlhk.in/images/showcase/studio-hub.jpg", 1200),
    "https://mlhk.in/images/showcase/studio-hub.jpg?w=1200",
  );
  assert.equal(resolveStaticImageSrc("data:image/png;base64,abc", 400), "data:image/png;base64,abc");
});

test("custom image loader falls back cleanly on empty string", () => {
  assert.equal(resolveStaticImageSrc("   "), "/images/showcase/studio-hub.jpg");
});

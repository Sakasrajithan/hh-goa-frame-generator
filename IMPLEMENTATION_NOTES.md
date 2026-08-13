# HH Goa 2026 Frame Generator — Implementation Notes

The generator creates the two required fixed-size PNG outputs entirely in the browser: **Format A** is 1200 × 1200 pixels and **Format B** is 1200 × 1600 pixels. Source photos can be repositioned by dragging the live artwork preview and zoomed with the provided control or a desktop scroll gesture. PNG download uses the completed canvas, so it produces a real image file rather than a browser screenshot.

The Share to X action first uploads the completed PNG to the project’s S3-backed object storage through a public server procedure. It then stores an anonymous record containing the image URL and minimal display metadata. The returned `/r/:id` route provides server-rendered Open Graph and Twitter Card tags, including an absolute `og:image`, `twitter:image`, and `twitter:card=summary_large_image`, so social crawlers receive the actual generated image. The prepared X post includes the exact required hashtags: **#HHGoa2026** and **#FrameInGoa**.

The Three.js background uses the required r0.143.0 release, procedural particle sheet, three post-processing composers, bloom settings, and supplied shader constants. The scene stops its animation loop when the document is hidden. On low-power devices—defined here as four or fewer logical CPU cores, four or fewer GB reported device memory, or a reduced-motion preference—the expensive scene is disabled and the static dark-green presentation layer remains available.

## Brand-asset assumption

No transparent official logo lockup, key-art source image, or licensed display font was provided with the attached build brief. The current canvas graphics therefore use the supplied dark-green, neon-green, cream, yellow, and magenta design direction alongside a compact text-based event mark. When the design team supplies the final lockup and art, the `drawBrandMark` helper in `client/src/lib/frameRenderer.ts` should be replaced with the official exported asset, and the canvas palette can be adjusted to final approved hex values.

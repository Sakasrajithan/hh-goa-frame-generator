# Validation Notes

## Marketing-site update

- Desktop and mobile full-page reviews confirm that the Hero, residency story, schedule, stats, AI × Crypto section, generator introduction, retained generator, and footer are present in the intended mobile-first flow.
- The Hero “Make Your Frame” CTA was exercised in the browser and navigated to `#generator`, placing the retained frame-generator controls in view.
- Source photography is uploaded through project-managed web storage and the two lower-page photographs use native `loading="lazy"`.
- A disposable PNG was passed through the live browser upload input after the page expansion. The PFP format rendered a 1200×1200 live canvas with enabled download and Share-to-X controls.
- The same live generator was switched to Builder ID after upload; the rendered canvas and UI label confirmed the required 1200×1600 portrait output, while the crop control and text fields remained available.
- In the final smoke test, the live crop zoom control was changed from `1.0×` to `1.8×`; the Builder ID canvas remained active at 1200×1600 after the interaction.
- The live Download PNG control was triggered for the rendered Builder ID. The live Share-to-X control was then triggered and entered its `Preparing…` state, initiating the server-backed share-record creation flow without submitting any social post.
- The Share-to-X flow completed successfully and displayed “Share link is ready — X will attach your graphic preview.” This confirms that the post-update page can create the S3-backed preview link before opening the pre-filled X compose surface; no content was posted.

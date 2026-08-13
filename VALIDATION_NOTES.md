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

## Share-to-X popup fix

The Share-to-X handler now reserves a blank browser tab synchronously during the click event and redirects that tab only after the S3-backed share URL is available. A fresh disposable image was loaded in the updated development build and rendered to its required 1200×1200 PFP canvas before triggering the corrected share action.

The corrected Share-to-X button was invoked with the rendered test image. The change is specifically designed to avoid the former asynchronous `window.open` popup-blocking condition by reserving its compose tab while the user gesture is still active.

After the corrected-button invocation, the generator page remained healthy and the browser console contained no client-side popup, storage, or share-link error.

The popup instrumentation confirmed that the revised handler calls `window.open("about:blank", "_blank")` synchronously at the start of the Share-to-X click and keeps the button in its expected `Preparing…` state while the generated-image share record is created.

The completed instrumentation captured one reserved blank-tab call and the resulting `https://twitter.com/intent/tweet` destination. The generated intent contained the frame caption, the exact `#HHGoa2026` and `#FrameInGoa` hashtags, and the new `/r/…` generated-image share URL. The browser instrumentation was restored after the check.

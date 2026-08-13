import { describe, expect, it } from "vitest";
import { OUTPUT_DIMENSIONS, tweetCaption } from "../client/src/lib/frameRenderer";
import { decodePngDataUrl, shareMetaTitle } from "./shares";

describe("generated share payloads", () => {
  it("decodes a valid PNG data URL", () => {
    const bytes = decodePngDataUrl("data:image/png;base64,aGVsbG8=");
    expect(bytes.toString()).toBe("hello");
  });

  it("rejects unsupported formats and malformed image data", () => {
    expect(() => decodePngDataUrl("data:image/jpeg;base64,aGVsbG8=")).toThrow("Only PNG");
    expect(() => decodePngDataUrl("data:image/png;base64,not valid")).toThrow("Only PNG");
  });

  it("builds a descriptive title from builder metadata", () => {
    expect(shareMetaTitle("Ayesha Shah", "VIBE CODER")).toBe("Ayesha Shah · VIBE CODER · Hacker House Goa 2026");
  });
});

describe("X captions", () => {
  it("always includes the exact required hashtags for PFP shares", () => {
    const caption = tweetCaption("pfp", { name: "", handle: "", title: "VIBE CODER" });
    expect(caption).toContain("#HHGoa2026");
    expect(caption).toContain("#FrameInGoa");
  });

  it("uses the builder title for an ID card caption", () => {
    const caption = tweetCaption("id", { name: "Ayesha", handle: "ayesha", title: "ON-CHAIN MENACE" });
    expect(caption).toContain("On-Chain Menace");
    expect(caption).toContain("#HHGoa2026 #FrameInGoa");
  });
});

describe("canvas output contract", () => {
  it("retains the mandated fixed dimensions for both HH Goa formats", () => {
    expect(OUTPUT_DIMENSIONS.pfp).toEqual({ width: 1200, height: 1200 });
    expect(OUTPUT_DIMENSIONS.id).toEqual({ width: 1200, height: 1600 });
  });
});

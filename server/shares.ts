import { nanoid } from "nanoid";
import { createGeneratedShare } from "./db";
import { storagePut } from "./storage";

export type ShareFormat = "pfp" | "id";

type CreateShareInput = {
  imageDataUrl: string;
  format: ShareFormat;
  builderName?: string;
  builderHandle?: string;
  builderTitle?: string;
};

function cleanValue(value: string | undefined, maxLength = 128) {
  return value?.trim().slice(0, maxLength) || null;
}

export function decodePngDataUrl(dataUrl: string): Buffer {
  const match = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) throw new Error("Only PNG image data is supported for sharing");
  const bytes = Buffer.from(match[1], "base64");
  if (bytes.length === 0 || bytes.length > 10 * 1024 * 1024) {
    throw new Error("Generated image must be between 1 byte and 10 MB");
  }
  return bytes;
}

export async function createGeneratedImageShare(input: CreateShareInput) {
  const id = nanoid(14);
  const imageBytes = decodePngDataUrl(input.imageDataUrl);
  const stored = await storagePut(`hh-goa-2026/generated/${id}.png`, imageBytes, "image/png");
  await createGeneratedShare({
    id,
    imageKey: stored.key,
    imageUrl: stored.url,
    format: input.format,
    builderName: cleanValue(input.builderName),
    builderHandle: cleanValue(input.builderHandle),
    builderTitle: cleanValue(input.builderTitle),
  });
  return { id, imageUrl: stored.url };
}

export function shareMetaTitle(name?: string | null, title?: string | null) {
  if (name && title) return `${name} · ${title} · Hacker House Goa 2026`;
  return "Hacker House Goa 2026 · Frame In Goa";
}

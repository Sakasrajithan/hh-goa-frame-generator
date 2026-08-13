export type GeneratorFormat = "pfp" | "id";

export type CropState = {
  x: number;
  y: number;
  zoom: number;
};

export type BuilderDetails = {
  name: string;
  handle: string;
  title: string;
};

export const OUTPUT_DIMENSIONS = {
  pfp: { width: 1200, height: 1200 },
  id: { width: 1200, height: 1600 },
} as const;

export const BUILDER_TITLES = [
  "VIBE CODER",
  "ON-CHAIN MENACE",
  "PROMPT WHISPERER",
  "MAINNET OR BUST",
  "CHAOS ENGINEER",
  "FULL-STACK DEGEN",
  "SHIP-FIRST, ASK-LATER",
  "MULTICHAIN MERCENARY",
  "DEMO DAY VILLAIN",
  "BEACH RESORT BUILDOOR",
  "247-CLUB MEMBER",
  "REAL PRODUCT, NO CAP",
];

const COLORS = {
  ink: "#02160c",
  green: "#0aff7f",
  mint: "#34e89a",
  deep: "#06351e",
  cream: "#fdf6e3",
  yellow: "#f4ce14",
  pink: "#e91e8c",
  shadow: "#010805",
};

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  const r = Math.min(radius, w / 2, h / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function clipRoundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  roundRect(context, x, y, w, h, radius);
  context.clip();
}

function drawPhotoCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  crop: CropState,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const zoom = Math.max(1, Math.min(3, crop.zoom));
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
  const drawnWidth = image.naturalWidth * scale;
  const drawnHeight = image.naturalHeight * scale;
  const offsetX = Math.min(0, Math.max(width - drawnWidth, (width - drawnWidth) / 2 + crop.x * width));
  const offsetY = Math.min(0, Math.max(height - drawnHeight, (height - drawnHeight) / 2 + crop.y * height));
  context.drawImage(image, x + offsetX, y + offsetY, drawnWidth, drawnHeight);
}

function drawBrandMark(context: CanvasRenderingContext2D, x: number, y: number, scale = 1) {
  const width = 260 * scale;
  const height = 156 * scale;
  context.save();
  context.fillStyle = COLORS.ink;
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 5 * scale;
  roundRect(context, x, y, width, height, 8 * scale);
  context.fill();
  context.stroke();

  context.fillStyle = COLORS.yellow;
  context.font = `800 ${37 * scale}px "Space Grotesk", sans-serif`;
  context.letterSpacing = "0px";
  context.fillText("HACKER", x + 20 * scale, y + 51 * scale);
  context.fillText("HOUSE", x + 20 * scale, y + 96 * scale);

  context.fillStyle = COLORS.pink;
  roundRect(context, x + 54 * scale, y + 67 * scale, 152 * scale, 35 * scale, 4 * scale);
  context.fill();
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 3 * scale;
  context.stroke();
  context.fillStyle = COLORS.cream;
  context.font = `800 ${20 * scale}px "Space Grotesk", sans-serif`;
  context.fillText("गोवा / GOA", x + 70 * scale, y + 92 * scale);

  context.fillStyle = COLORS.mint;
  context.font = `700 ${10 * scale}px "Space Grotesk", sans-serif`;
  context.fillText("INDIA · 28—31 OCT 2026", x + 20 * scale, y + 129 * scale);
  context.fillText("2:47 PM STUDIO", x + 20 * scale, y + 143 * scale);
  context.restore();
}

function drawPalm(context: CanvasRenderingContext2D, x: number, y: number, size: number, flip = false) {
  context.save();
  context.translate(x, y);
  context.scale(flip ? -1 : 1, 1);
  context.strokeStyle = COLORS.mint;
  context.lineWidth = Math.max(4, size * 0.05);
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(0, size);
  context.quadraticCurveTo(size * 0.08, size * 0.38, 0, 0);
  context.stroke();
  context.lineWidth = Math.max(3, size * 0.035);
  for (const [ex, ey] of [[-0.55, -0.18], [-0.48, 0.16], [-0.23, -0.4], [0.28, -0.38], [0.52, -0.12], [0.42, 0.22]]) {
    context.beginPath();
    context.moveTo(0, 0);
    context.quadraticCurveTo(size * ex * 0.52, size * ey * 0.45, size * ex, size * ey);
    context.stroke();
  }
  context.restore();
}

function drawTexture(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save();
  context.globalAlpha = 0.13;
  context.strokeStyle = COLORS.mint;
  context.lineWidth = 1;
  for (let x = -height; x < width; x += 46) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + height, height);
    context.stroke();
  }
  context.restore();
}

function drawPfpFrame(context: CanvasRenderingContext2D, image: HTMLImageElement, crop: CropState) {
  const size = 1200;
  context.fillStyle = COLORS.ink;
  context.fillRect(0, 0, size, size);
  drawTexture(context, size, size);

  const photoInset = 87;
  context.save();
  context.beginPath();
  context.arc(size / 2, size / 2, 514, 0, Math.PI * 2);
  context.clip();
  drawPhotoCover(context, image, crop, photoInset, photoInset, size - photoInset * 2, size - photoInset * 2);
  const photoShade = context.createLinearGradient(0, 0, 0, size);
  photoShade.addColorStop(0, "rgba(2,22,12,0.05)");
  photoShade.addColorStop(1, "rgba(2,22,12,0.45)");
  context.fillStyle = photoShade;
  context.fillRect(0, 0, size, size);
  context.restore();

  context.strokeStyle = COLORS.green;
  context.lineWidth = 28;
  context.beginPath();
  context.arc(size / 2, size / 2, 527, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 8;
  context.beginPath();
  context.arc(size / 2, size / 2, 556, 0.3, 2.1);
  context.stroke();
  context.beginPath();
  context.arc(size / 2, size / 2, 556, 3.45, 5.25);
  context.stroke();

  context.fillStyle = COLORS.ink;
  roundRect(context, 388, 38, 424, 124, 22);
  context.fill();
  context.strokeStyle = COLORS.green;
  context.lineWidth = 5;
  context.stroke();
  context.fillStyle = COLORS.cream;
  context.font = '800 28px "Space Grotesk", sans-serif';
  context.textAlign = "center";
  context.fillText("HACKER HOUSE", size / 2, 86);
  context.fillStyle = COLORS.yellow;
  context.font = '800 44px "Space Grotesk", sans-serif';
  context.fillText("GOA 2026", size / 2, 132);

  context.fillStyle = COLORS.pink;
  roundRect(context, 426, 1048, 348, 73, 14);
  context.fill();
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 5;
  context.stroke();
  context.fillStyle = COLORS.cream;
  context.font = '800 30px "Space Grotesk", sans-serif';
  context.textAlign = "center";
  context.fillText("#FRAMEINGOA", size / 2, 1094);

  drawPalm(context, 136, 950, 150);
  drawPalm(context, 1064, 950, 150, true);
  context.fillStyle = COLORS.mint;
  context.font = '700 16px "Space Grotesk", sans-serif';
  context.textAlign = "center";
  context.fillText("INDIA · 28—31 OCT 2026 · 2:47 PM STUDIO", size / 2, 1163);
  context.textAlign = "start";
}

function drawIdCard(context: CanvasRenderingContext2D, image: HTMLImageElement, crop: CropState, details: BuilderDetails) {
  const width = 1200;
  const height = 1600;
  context.fillStyle = COLORS.ink;
  context.fillRect(0, 0, width, height);
  drawTexture(context, width, height);

  context.fillStyle = COLORS.deep;
  roundRect(context, 45, 45, width - 90, height - 90, 54);
  context.fill();
  context.strokeStyle = COLORS.green;
  context.lineWidth = 5;
  context.stroke();
  drawBrandMark(context, 94, 92, 1.35);
  context.fillStyle = COLORS.mint;
  context.textAlign = "right";
  context.font = '700 23px "Space Grotesk", sans-serif';
  context.fillText("BUILDER ID / 2026", 1090, 123);
  context.fillStyle = COLORS.cream;
  context.font = '700 19px "Space Grotesk", sans-serif';
  context.fillText("GOA, INDIA · 28—31 OCT", 1090, 158);
  context.textAlign = "start";

  context.save();
  clipRoundRect(context, 94, 330, 1012, 596, 32);
  drawPhotoCover(context, image, crop, 94, 330, 1012, 596);
  const photoGradient = context.createLinearGradient(0, 330, 0, 926);
  photoGradient.addColorStop(0.5, "rgba(2,22,12,0)");
  photoGradient.addColorStop(1, "rgba(2,22,12,0.65)");
  context.fillStyle = photoGradient;
  context.fillRect(94, 330, 1012, 596);
  context.restore();
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 8;
  roundRect(context, 94, 330, 1012, 596, 32);
  context.stroke();
  drawPalm(context, 178, 749, 132);
  drawPalm(context, 1025, 749, 132, true);

  context.fillStyle = COLORS.yellow;
  roundRect(context, 94, 979, 1012, 84, 16);
  context.fill();
  context.fillStyle = COLORS.ink;
  context.font = '800 51px "Space Grotesk", sans-serif';
  const builderName = (details.name.trim() || "YOUR NAME").toUpperCase();
  context.fillText(builderName.slice(0, 27), 125, 1035);

  context.fillStyle = COLORS.cream;
  context.font = '700 23px "Space Grotesk", sans-serif';
  context.fillText(details.handle.trim() ? `@${details.handle.trim().replace(/^@/, "")}` : "@HHGOA2026", 128, 1107);
  context.fillStyle = COLORS.mint;
  context.font = '700 21px "Space Grotesk", sans-serif';
  context.textAlign = "right";
  context.fillText("SELECTED BUILDER", 1069, 1107);
  context.textAlign = "start";

  context.fillStyle = COLORS.pink;
  roundRect(context, 94, 1164, 1012, 170, 23);
  context.fill();
  context.strokeStyle = COLORS.yellow;
  context.lineWidth = 6;
  context.stroke();
  context.fillStyle = COLORS.cream;
  context.font = '700 17px "Space Grotesk", sans-serif';
  context.fillText("BUILDER TITLE", 131, 1216);
  context.font = '800 49px "Space Grotesk", sans-serif';
  context.fillText(details.title, 131, 1286);

  context.fillStyle = COLORS.green;
  roundRect(context, 94, 1383, 1012, 111, 19);
  context.fill();
  context.fillStyle = COLORS.ink;
  context.font = '800 21px "Space Grotesk", sans-serif';
  context.textAlign = "center";
  context.fillText("AI × CRYPTO · MULTICHAIN · SHIP REAL PRODUCTS", 600, 1431);
  context.font = '700 18px "Space Grotesk", sans-serif';
  context.fillText("HACKER HOUSE GOA 2026 · 247 BUILDERS", 600, 1468);
  context.textAlign = "start";
}

export function renderComposite(
  canvas: HTMLCanvasElement,
  format: GeneratorFormat,
  image: HTMLImageElement,
  crop: CropState,
  details: BuilderDetails,
) {
  const dimensions = OUTPUT_DIMENSIONS[format];
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext("2d");
  if (!context) return;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  if (format === "pfp") drawPfpFrame(context, image, crop);
  else drawIdCard(context, image, crop, details);
}

export function tweetCaption(format: GeneratorFormat, details: BuilderDetails) {
  const title = details.title.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
  const lead = format === "pfp"
    ? "Framed up for Hacker House Goa 2026 — shipping real products from Goa."
    : `I'm a ${title} at Hacker House Goa 2026 — building where the beach meets mainnet.`;
  return `${lead} #HHGoa2026 #FrameInGoa`;
}

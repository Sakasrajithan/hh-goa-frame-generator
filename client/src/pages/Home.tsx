import { ChangeEvent, DragEvent, PointerEvent, WheelEvent, useCallback, useEffect, useRef, useState } from "react";
import heic2any from "heic2any";
import { Download, ImagePlus, LoaderCircle, Move, RefreshCw, Share2, Sparkles, Upload, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { BuilderDetails, BUILDER_TITLES, CropState, GeneratorFormat, renderComposite, tweetCaption } from "@/lib/frameRenderer";
import { trpc } from "@/lib/trpc";
import FlowWave from "@/components/FlowWave";

const initialCrop: CropState = { x: 0, y: 0, zoom: 1 };

function isHeic(file: File) {
  return file.type === "image/heic" || file.type === "image/heif" || /\.hei[cf]$/i.test(file.name);
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; cropX: number; cropY: number } | null>(null);
  const activeUrlRef = useRef<string | null>(null);

  const [format, setFormat] = useState<GeneratorFormat>("pfp");
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [crop, setCrop] = useState<CropState>(initialCrop);
  const [details, setDetails] = useState<BuilderDetails>({ name: "", handle: "", title: BUILDER_TITLES[0] });
  const shareMutation = trpc.shares.create.useMutation();

  const render = useCallback(() => {
    if (canvasRef.current && image) renderComposite(canvasRef.current, format, image, crop, details);
  }, [crop, details, format, image]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => () => {
    if (activeUrlRef.current) URL.revokeObjectURL(activeUrlRef.current);
  }, []);

  const loadFile = async (file: File) => {
    if (!file.type.startsWith("image/") && !isHeic(file)) {
      toast.error("Please choose a JPG, PNG, or HEIC image.");
      return;
    }
    try {
      setIsConverting(true);
      const source = isHeic(file)
        ? new File([await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 }) as Blob], "goa-photo.jpg", { type: "image/jpeg" })
        : file;
      if (activeUrlRef.current) URL.revokeObjectURL(activeUrlRef.current);
      const url = URL.createObjectURL(source);
      activeUrlRef.current = url;
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setFileName(file.name);
        setCrop(initialCrop);
        setIsConverting(false);
      };
      img.onerror = () => {
        setIsConverting(false);
        toast.error("That image could not be opened. Please try another file.");
      };
      img.src = url;
    } catch (error) {
      console.error(error);
      setIsConverting(false);
      toast.error("We couldn't convert that HEIC file. Try exporting it as JPG.");
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void loadFile(file);
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) void loadFile(file);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!image || !previewRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, cropX: crop.x, cropY: crop.y };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !previewRef.current) return;
    const bounds = previewRef.current.getBoundingClientRect();
    const { x, y, cropX, cropY } = dragRef.current;
    setCrop(current => ({
      ...current,
      x: Math.max(-1, Math.min(1, cropX + (event.clientX - x) / bounds.width)),
      y: Math.max(-1, Math.min(1, cropY + (event.clientY - y) / bounds.height)),
    }));
  };

  const stopPointer = () => {
    dragRef.current = null;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!image) return;
    event.preventDefault();
    setCrop(current => ({ ...current, zoom: Math.max(1, Math.min(3, current.zoom - event.deltaY * 0.0012)) }));
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const link = document.createElement("a");
    link.download = `hh-goa-2026-${format === "pfp" ? "pfp-frame" : "builder-id"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("PNG saved — ready to post.");
  };

  const shareToX = async () => {
    if (!image || !canvasRef.current) return;
    try {
      const share = await shareMutation.mutateAsync({
        imageDataUrl: canvasRef.current.toDataURL("image/png"),
        format,
        builderName: details.name,
        builderHandle: details.handle,
        builderTitle: details.title,
      });
      const url = `${window.location.origin}/r/${share.id}`;
      const tweet = `${tweetCaption(format, details)} ${url}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, "_blank", "noopener,noreferrer");
      toast.success("Share link is ready — X will attach your graphic preview.");
    } catch (error) {
      console.error(error);
      toast.error("We couldn't create your share link. Download the PNG and try again.");
    }
  };

  const reroll = () => {
    const choices = BUILDER_TITLES.filter(title => title !== details.title);
    setDetails(current => ({ ...current, title: choices[Math.floor(Math.random() * choices.length)] }));
  };

  const hasImage = Boolean(image);
  const outputLabel = format === "pfp" ? "1200 × 1200 PNG" : "1200 × 1600 PNG";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02160c] text-[#fdf6e3]">
      <FlowWave />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(10,255,127,0.14),transparent_34%),linear-gradient(125deg,rgba(52,232,154,0.08),transparent_35%,rgba(10,255,127,0.04))]" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-4 pb-10 pt-4 sm:px-7 lg:px-10">
        <header className="flex items-center justify-between gap-4 py-3 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#0aff7f]/70 bg-[#052313]/85 text-center font-black leading-3 text-[#f4ce14] shadow-[0_0_30px_rgba(10,255,127,0.18)]">
              <span>HH<br />GOA</span>
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#34e89a]">HACKER HOUSE</p>
              <p className="text-sm font-bold tracking-tight text-[#fdf6e3] sm:text-base">Goa ’26 Frame Generator</p>
            </div>
          </div>
          <div className="hidden rounded-full border border-[#34e89a]/25 bg-[#02160c]/75 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.14em] text-[#34e89a] backdrop-blur-md sm:block">28—31 OCT · GOA, INDIA</div>
        </header>

        <section className="grid flex-1 items-center gap-7 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-12 lg:py-10">
          <div className="order-1">
            <div className="max-w-[610px]">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]"><Sparkles className="h-3.5 w-3.5" />YOUR ON-CHAIN CALLING CARD</p>
              <h1 className="max-w-[590px] text-4xl font-bold leading-[0.98] tracking-[-0.06em] text-[#fdf6e3] sm:text-6xl lg:text-7xl">Frame the build.<br /><span className="text-[#0aff7f]">Ship the signal.</span></h1>
              <p className="mt-5 max-w-[515px] text-sm leading-6 text-[#c7ecd9] sm:text-base">Drop in a photo, tune the crop, and leave with a Hacker House Goa graphic made for the timeline. No login. No gatekeeping. Just build energy.</p>
            </div>

            <div className="mt-7 flex rounded-2xl border border-[#34e89a]/25 bg-[#02160c]/65 p-1.5 shadow-2xl backdrop-blur-xl">
              <button onClick={() => setFormat("pfp")} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${format === "pfp" ? "bg-[#0aff7f] text-[#02160c]" : "text-[#b9dfca] hover:text-[#fdf6e3]"}`}><span className="grid h-5 w-5 place-items-center rounded-full border-2 border-current" />PFP Frame</button>
              <button onClick={() => setFormat("id")} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${format === "id" ? "bg-[#0aff7f] text-[#02160c]" : "text-[#b9dfca] hover:text-[#fdf6e3]"}`}><span className="h-5 w-4 rounded-sm border-2 border-current" />Builder ID</button>
            </div>

            {!hasImage ? (
              <button onClick={() => inputRef.current?.click()} onDragOver={event => event.preventDefault()} onDrop={onDrop} className="group mt-4 flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#34e89a]/45 bg-[#042515]/60 px-6 text-center transition hover:border-[#0aff7f] hover:bg-[#08351d]/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0aff7f]">
                {isConverting ? <LoaderCircle className="h-7 w-7 animate-spin text-[#0aff7f]" /> : <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#0aff7f]/35 bg-[#0aff7f]/10 text-[#0aff7f] transition group-hover:scale-105"><Upload className="h-6 w-6" /></div>}
                <span className="mt-4 text-base font-bold text-[#fdf6e3]">{isConverting ? "Converting your photo…" : "Drop your photo here"}</span>
                <span className="mt-1 text-xs text-[#a8cfb9]">or tap to browse · JPG, PNG, HEIC</span>
              </button>
            ) : (
              <div className="mt-4 rounded-2xl border border-[#34e89a]/25 bg-[#042515]/65 p-4 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2 text-xs text-[#b9dfca]"><ImagePlus className="h-4 w-4 shrink-0 text-[#0aff7f]" /><span className="truncate">{fileName}</span></div><button onClick={() => inputRef.current?.click()} className="shrink-0 font-mono text-[10px] font-bold tracking-widest text-[#0aff7f] hover:text-[#fdf6e3]">REPLACE</button></div>
                <div className="flex items-center gap-3"><ZoomIn className="h-4 w-4 text-[#0aff7f]" /><input aria-label="Photo zoom" type="range" min="1" max="3" step="0.01" value={crop.zoom} onChange={event => setCrop(current => ({ ...current, zoom: Number(event.target.value) }))} className="accent-[#0aff7f]" /><span className="w-10 text-right font-mono text-[11px] text-[#b9dfca]">{crop.zoom.toFixed(1)}×</span></div>
                <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wide text-[#86ba9b]"><Move className="h-3.5 w-3.5" />DRAG THE PREVIEW TO REPOSITION · SCROLL TO ZOOM</p>
              </div>
            )}

            {format === "id" && (
              <div className="mt-4 grid gap-3 rounded-2xl border border-[#34e89a]/25 bg-[#042515]/65 p-4 sm:grid-cols-2">
                <label className="block text-xs font-bold text-[#d8f4e2]">NAME<input value={details.name} onChange={event => setDetails(current => ({ ...current, name: event.target.value }))} maxLength={27} placeholder="e.g. Ayesha Shah" className="mt-2 h-11 w-full rounded-xl border border-[#34e89a]/25 bg-[#02160c]/75 px-3 text-sm text-[#fdf6e3] outline-none transition placeholder:text-[#72a786] focus:border-[#0aff7f]" /></label>
                <label className="block text-xs font-bold text-[#d8f4e2]">X HANDLE <span className="font-normal text-[#74a789]">optional</span><input value={details.handle} onChange={event => setDetails(current => ({ ...current, handle: event.target.value.replace(/^@/, "") }))} maxLength={20} placeholder="ayesha" className="mt-2 h-11 w-full rounded-xl border border-[#34e89a]/25 bg-[#02160c]/75 px-3 text-sm text-[#fdf6e3] outline-none transition placeholder:text-[#72a786] focus:border-[#0aff7f]" /></label>
                <div className="sm:col-span-2"><p className="text-xs font-bold text-[#d8f4e2]">BUILDER TITLE</p><div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[#e91e8c]/50 bg-[#e91e8c]/15 px-3 py-3"><span className="text-sm font-black tracking-tight text-[#fdf6e3]">{details.title}</span><button onClick={reroll} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f4ce14] text-[#02160c] hover:bg-[#fdf6e3]" aria-label="Reroll builder title"><RefreshCw className="h-4 w-4" /></button></div></div>
              </div>
            )}

            <input ref={inputRef} onChange={onInputChange} accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif" capture="user" className="hidden" type="file" />
          </div>

          <div className="order-2">
            <div className="relative mx-auto max-w-[510px]">
              <div className="absolute -inset-10 -z-10 rounded-full bg-[#0aff7f]/15 blur-[90px]" />
              <div ref={previewRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={stopPointer} onPointerCancel={stopPointer} onWheel={onWheel} className={`relative overflow-hidden rounded-[22px] border border-[#34e89a]/35 bg-[#03180d]/80 p-2 shadow-[0_25px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl ${hasImage ? "cursor-grab active:cursor-grabbing touch-none" : ""}`}>
                <div className="relative overflow-hidden rounded-[15px] bg-[#02160c]" style={{ aspectRatio: format === "pfp" ? "1" : "3 / 4" }}>
                  {hasImage ? <canvas ref={canvasRef} className="block h-full w-full" aria-label="Live branded HH Goa canvas preview" /> : <div className="absolute inset-0 grid place-items-center p-8 text-center"><div><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#0aff7f]/30 bg-[#0aff7f]/10"><ImagePlus className="h-7 w-7 text-[#0aff7f]" /></div><p className="mt-4 text-sm font-bold text-[#e5f8ea]">Your live preview lands here.</p><p className="mt-1 text-xs text-[#8bb69a]">Upload a portrait, crew shot, or your best build-face.</p></div></div>}
                </div>
                {hasImage && <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between rounded-lg border border-[#0aff7f]/20 bg-[#02160c]/80 px-3 py-2 font-mono text-[9px] font-bold tracking-[0.14em] text-[#c4eed2] backdrop-blur-md"><span>LIVE CANVAS</span><span>{outputLabel}</span></div>}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button disabled={!hasImage} onClick={download} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0aff7f] px-4 text-sm font-black text-[#02160c] transition hover:bg-[#b4ffd2] disabled:cursor-not-allowed disabled:opacity-40"><Download className="h-4 w-4" />Download PNG</button>
                <button disabled={!hasImage || shareMutation.isPending} onClick={() => void shareToX()} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#34e89a]/45 bg-[#031d10]/80 px-4 text-sm font-bold text-[#fdf6e3] transition hover:border-[#0aff7f] hover:bg-[#0a3b1f] disabled:cursor-not-allowed disabled:opacity-40">{shareMutation.isPending ? <LoaderCircle className="h-4 w-4 animate-spin text-[#0aff7f]" /> : <Share2 className="h-4 w-4 text-[#0aff7f]" />}{shareMutation.isPending ? "Preparing…" : "Share to X"}</button>
              </div>
              <p className="mt-3 text-center font-mono text-[10px] font-bold tracking-[0.07em] text-[#79ab8b]">#HHGoa2026&nbsp;&nbsp;·&nbsp;&nbsp;#FrameInGoa</p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-2 border-t border-[#34e89a]/15 pt-4 font-mono text-[10px] font-bold tracking-[0.1em] text-[#639a77] sm:flex-row"><span>BUILT FOR THE 247 BUILDER CLUB</span><span>AI × CRYPTO · MULTICHAIN · GOA, INDIA</span></footer>
      </div>
    </main>
  );
}

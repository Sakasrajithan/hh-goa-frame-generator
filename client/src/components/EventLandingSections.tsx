import { ArrowDown, ArrowUpRight, CalendarDays, MapPin, Sparkles } from "lucide-react";

const HERO_PHOTO = "/manus-storage/goa-aerial-resort_2570c758.jpeg";
const BEACH_PHOTO = "/manus-storage/goa-beach-horizon_747fdf48.jpeg";
const SUNSET_PHOTO = "/manus-storage/goa-sunset-coast_fe847316.jpeg";

const schedule = [
  { day: "DAY 01", title: "GENESIS DAY", line: "Find your people. Pick your problem.", tone: "bg-[#f4ce14] text-[#02160c]", tape: "bg-[#e91e8c]" },
  { day: "DAY 02", title: "DAY OF TRIANGLE", line: "Product × code × the real world.", tone: "bg-[#e91e8c] text-[#fdf6e3]", tape: "bg-[#f4ce14]" },
  { day: "DAY 03", title: "BUILD DAY", line: "Prototype loud. Review daily.", tone: "bg-[#fdf6e3] text-[#02160c]", tape: "bg-[#0aff7f]" },
  { day: "DAY 04", title: "LAUNCH DAY", line: "Ship to the room. Vote on-chain.", tone: "bg-[#34e89a] text-[#02160c]", tape: "bg-[#e91e8c]" },
];

const stats = [
  ["247", "BUILDERS"],
  ["10,000+", "REGISTRATIONS"],
  ["50+", "SPEAKERS · MENTORS · JUDGES"],
  ["$50,000+", "IN BOUNTIES"],
];

function GoaSeal({ className = "" }: { className?: string }) {
  return <div className={`inline-flex min-h-32 w-32 flex-col items-center justify-center rounded-[28px] border-[3px] border-[#f4ce14] bg-[#02160c]/90 px-3 text-center shadow-[0_0_36px_rgba(244,206,20,0.22)] ${className}`}><span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#34e89a]">HACKER HOUSE</span><span className="mt-1 text-3xl font-black leading-none tracking-[-0.1em] text-[#f4ce14]">गोवा</span><span className="mt-1 font-mono text-[10px] font-bold tracking-[0.2em] text-[#fdf6e3]">GOA · 2026</span></div>;
}

export function HeroSection() {
  return <section id="top" className="relative z-10 isolate min-h-[730px] overflow-hidden border-b border-[#34e89a]/20 sm:min-h-[810px]">
    <img src={HERO_PHOTO} alt="Aerial view of a palm-lined Goa coast and beach-resort setting" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,22,12,0.98)_0%,rgba(2,22,12,0.76)_38%,rgba(2,22,12,0.3)_100%),linear-gradient(0deg,rgba(2,22,12,0.96)_0%,transparent_55%)]" />
    <div className="absolute inset-x-0 top-0 mx-auto flex max-w-[1480px] items-center justify-between px-4 py-5 sm:px-7 lg:px-10"><span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#b9dfca]">2:47PM STUDIO PRESENTS</span><a href="#generator" className="rounded-full border border-[#0aff7f]/70 bg-[#02160c]/65 px-4 py-2 font-mono text-[10px] font-bold tracking-[0.16em] text-[#0aff7f] backdrop-blur-md hover:bg-[#0aff7f] hover:text-[#02160c]">MAKE YOUR FRAME</a></div>
    <div className="mx-auto flex min-h-[730px] max-w-[1480px] items-end px-4 pb-14 pt-28 sm:min-h-[810px] sm:px-7 sm:pb-20 lg:px-10">
      <div className="max-w-3xl">
        <GoaSeal className="mb-7 sm:mb-9" />
        <p className="mb-5 flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]"><Sparkles className="h-3.5 w-3.5" />HOUSE / 2026 / INDIA</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-[0.91] tracking-[-0.075em] text-[#fdf6e3] sm:text-7xl lg:text-[6.2rem]">India’s premier <span className="text-[#0aff7f]">builder residency.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#d8f4e2] sm:text-lg">Four days on the coast for the people building what comes next. Come to Goa to think deeper, ship faster, and launch in public.</p>
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-[11px] font-bold tracking-[0.13em]"><span className="inline-flex items-center gap-2 rounded-full border border-[#f4ce14]/65 bg-[#02160c]/75 px-4 py-3 text-[#f4ce14] backdrop-blur-md"><CalendarDays className="h-4 w-4" />OCT 28—31, 2026</span><span className="inline-flex items-center gap-2 rounded-full border border-[#34e89a]/45 bg-[#02160c]/75 px-4 py-3 text-[#d8f4e2] backdrop-blur-md"><MapPin className="h-4 w-4 text-[#34e89a]" />GOA, INDIA</span></div>
        <a href="#generator" className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#0aff7f] px-6 py-4 text-base font-black text-[#02160c] shadow-[0_0_46px_rgba(10,255,127,0.24)] transition hover:bg-[#b4ffd2]"><ArrowDown className="h-5 w-5" />Make Your Frame</a>
      </div>
    </div>
  </section>;
}

export function AboutSection() {
  return <section id="about" className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-7 sm:py-28 lg:px-10">
    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
      <div className="relative order-2 lg:order-1"><div className="absolute -inset-3 -z-10 rotate-[-2deg] rounded-[30px] bg-[#e91e8c] opacity-75" /><img src={BEACH_PHOTO} alt="Goa beach with a long shoreline and palms" loading="lazy" className="aspect-[4/3] w-full rounded-[25px] border-4 border-[#fdf6e3] object-cover shadow-[16px_18px_0_#f4ce14]" /><div className="absolute -bottom-5 -right-3 rotate-[4deg] rounded-xl border-2 border-[#02160c] bg-[#f4ce14] px-4 py-3 font-mono text-[10px] font-bold tracking-[0.14em] text-[#02160c] shadow-[6px_7px_0_#e91e8c]">RESIDENCY, NOT A HACKATHON</div></div>
      <div className="order-1 lg:order-2"><p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]">WHAT IT IS / WHY GOA</p><h2 className="mt-4 max-w-xl text-4xl font-bold leading-[0.96] tracking-[-0.06em] text-[#fdf6e3] sm:text-6xl">A builder residency, <span className="text-[#f4ce14]">not a hackathon.</span></h2><p className="mt-6 max-w-xl text-base leading-7 text-[#c7ecd9]">247 builders are selected from more than 10,000 registrations to spend four days turning early signals into real products. The rhythm is deliberate: build blocks, daily product reviews, sharp feedback, and a room that wants you to ship.</p><p className="mt-4 max-w-xl text-base leading-7 text-[#c7ecd9]">The residency closes with a public demo day and on-chain voting. Goa is the reset button; the house is the launchpad.</p><div className="mt-7 grid max-w-xl grid-cols-2 gap-3"><div className="rounded-xl border border-[#34e89a]/25 bg-[#06351e]/65 p-4"><span className="font-mono text-[10px] font-bold tracking-widest text-[#34e89a]">DAILY</span><p className="mt-1 font-bold text-[#fdf6e3]">Product reviews</p></div><div className="rounded-xl border border-[#e91e8c]/45 bg-[#e91e8c]/10 p-4"><span className="font-mono text-[10px] font-bold tracking-widest text-[#f4ce14]">PUBLIC</span><p className="mt-1 font-bold text-[#fdf6e3]">Demo day + voting</p></div></div></div>
    </div>
  </section>;
}

export function ScheduleSection() {
  return <section id="schedule" className="relative z-10 border-y border-[#34e89a]/20 bg-[#062918]/70 py-20 sm:py-28"><div className="mx-auto max-w-[1480px] px-4 sm:px-7 lg:px-10"><div className="max-w-2xl"><p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]">THE RUN OF SHOW</p><h2 className="mt-4 text-4xl font-bold leading-[0.96] tracking-[-0.06em] text-[#fdf6e3] sm:text-6xl">Four days. <span className="text-[#e91e8c]">No spectator mode.</span></h2></div><div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">{schedule.map((item, index) => <article key={item.day} className="relative pt-7"><div className="absolute left-1/2 top-0 h-9 w-px -translate-x-1/2 bg-[#e5c78c]" /><div className={`absolute left-1/2 top-6 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-sm opacity-90 ${item.tape}`} /><div style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }} className={`relative min-h-64 border-[3px] border-[#fdf6e3] p-6 shadow-[9px_10px_0_rgba(2,22,12,0.75)] ${item.tone}`}><p className="font-mono text-[10px] font-bold tracking-[0.16em] opacity-70">{item.day}</p><h3 className="mt-8 text-2xl font-black leading-none tracking-[-0.06em]">{item.title}</h3><p className="mt-4 max-w-[13rem] text-sm font-medium leading-5 opacity-85">{item.line}</p><div className="absolute bottom-5 right-5 font-mono text-[10px] font-bold tracking-[0.12em] opacity-70">HHG / 26</div></div></article>)}</div></div></section>;
}

export function StatsSection() {
  return <section className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-7 sm:py-28 lg:px-10"><div className="rounded-[30px] border border-[#34e89a]/25 bg-[#02160c]/75 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.22)] sm:p-10"><p className="text-center font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]">BY THE NUMBERS</p><div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([number, label]) => <div key={label} className="border-l-2 border-[#f4ce14] pl-5"><p className="text-4xl font-black tracking-[-0.07em] text-[#fdf6e3] sm:text-5xl">{number}</p><p className="mt-2 font-mono text-[10px] font-bold tracking-[0.13em] text-[#8fcba5]">{label}</p></div>)}</div></div></section>;
}

export function ThemeSection() {
  return <section className="relative z-10 overflow-hidden border-y border-[#f4ce14]/20 bg-[#e91e8c]"><div className="absolute inset-y-0 right-0 w-1/2 opacity-60"><img src={SUNSET_PHOTO} alt="Sunset over the Goa coast" loading="lazy" className="h-full w-full object-cover mix-blend-multiply" /></div><div className="relative mx-auto grid max-w-[1480px] gap-10 px-4 py-20 sm:px-7 sm:py-28 lg:grid-cols-[1fr_0.8fr] lg:px-10"><div><p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#f4ce14]">THE 2026 SIGNAL</p><h2 className="mt-4 max-w-2xl text-4xl font-black leading-[0.93] tracking-[-0.07em] text-[#fdf6e3] sm:text-6xl">AI × Crypto. <br />Multichain by default.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#fff1f8]">Hacker House Goa is where intelligent software, verifiable rails, and human ambition meet. Build agents, products, protocols, and experiences that only make sense now.</p></div><div className="self-end rounded-2xl border-2 border-[#f4ce14] bg-[#02160c]/90 p-6 shadow-[9px_10px_0_#f4ce14] backdrop-blur-md"><p className="font-mono text-[10px] font-bold tracking-[0.17em] text-[#34e89a]">PARALLEL HOUSE</p><h3 className="mt-3 text-3xl font-black tracking-[-0.06em] text-[#fdf6e3]">House of NGMI</h3><p className="mt-3 text-sm leading-6 text-[#c7ecd9]">A creator house running alongside HHG for the storytellers, artists, community builders, and cultural operators shaping the next internet.</p></div></div></section>;
}

export function GeneratorIntro() {
  return <section id="generator" className="relative z-10 scroll-mt-4 border-t border-[#34e89a]/20 pt-20 sm:pt-28"><div className="mx-auto max-w-[1480px] px-4 sm:px-7 lg:px-10"><div className="max-w-2xl"><p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#0aff7f]">MAKE THE SIGNAL YOURS</p><h2 className="mt-4 text-4xl font-bold leading-[0.96] tracking-[-0.06em] text-[#fdf6e3] sm:text-6xl">Bring your face. <span className="text-[#f4ce14]">Take the frame.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-[#c7ecd9]">Choose a profile frame or a builder ID, tune your crop, download the PNG, then share your build signal to the timeline.</p></div></div></section>;
}

export function SiteFooter() {
  return <footer className="relative z-10 border-t border-[#34e89a]/20 bg-[#010d07]/80"><div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 px-4 py-10 sm:px-7 lg:flex-row lg:items-end lg:px-10"><div><GoaSeal className="scale-[0.72] origin-bottom-left" /><p className="-mt-5 font-mono text-[10px] font-bold tracking-[0.15em] text-[#78ad8c]">A 2:47PM STUDIO PRODUCTION</p></div><div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] font-bold tracking-[0.14em]"><span className="text-[#78ad8c]">OFFICIAL SOCIALS / COMING SOON</span><a href="#generator" className="inline-flex items-center gap-2 rounded-full bg-[#0aff7f] px-4 py-3 text-[#02160c] hover:bg-[#b4ffd2]">MAKE YOUR FRAME <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div></footer>;
}

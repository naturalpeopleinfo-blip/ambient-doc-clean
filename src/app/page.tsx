"use client";

import { useMemo, useState, type ReactNode } from "react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe-bXgw0aTVcKIU14mwXXHmODpq41mku97wso5mgpD4pt7MNQ/viewform?usp=header";
const ALBERTO_IG_URL = "https://www.instagram.com/alberto_shonan/";
const GORIKI_IG_URL = "https://www.instagram.com/goriki.daisuke";

// HERO assets (place under /public/hero/)
// public/hero/hero.mp4
// public/hero/hero.png
const HERO_VIDEO = "/hero/hero.mp4";
const HERO_POSTER = "/hero/hero.png";
const PROFILE_IMAGE = "/profile.jpg";

// Works assets (place under /public/works/)
// public/works/alberto-01.mp4 ... alberto-06.mp4
// public/works/alberto-01.png ... alberto-06.png
const works = [
  {
    title: "ALBERTO｜Why We Opened (Owner Interview)",
    caption: "開く理由を、飾らず縦で残す。",
    src: "/works/alberto-01.mp4",
    poster: "/works/alberto-01.png",
  },
  {
    title: "ALBERTO｜Staff Talk #01",
    caption: "会話の温度で、人柄が立ち上がる。",
    src: "/works/alberto-02.mp4",
    poster: "/works/alberto-02.png",
  },
  {
    title: "ALBERTO｜Staff Talk #02",
    caption: "関係性の声が、信頼を見える形にする。",
    src: "/works/alberto-03.mp4",
    poster: "/works/alberto-03.png",
  },
  {
    title: "ALBERTO｜Favorite Hand (Mini Concept)",
    caption: "遊びの一手で、場の空気が伝わる。",
    src: "/works/alberto-04.mp4",
    poster: "/works/alberto-04.png",
  },
  {
    title: "ALBERTO｜Build Process (DIY & Interior)",
    caption: "手を動かす時間が、想いを現実にする。",
    src: "/works/alberto-05.mp4",
    poster: "/works/alberto-05.png",
  },
  {
    title: "ALBERTO｜Ambient Cut / Opening Teaser",
    caption: "言葉より先に、空気で惹きつける。",
    src: "/works/alberto-06.mp4",
    poster: "/works/alberto-06.png",
  },
] as const;

const copy = {
  hero: {
    brand: "AMBIENT DOC",
    headline: "Vertical Ambient Documentary",
    subhead: "AMBIENT DOC",
    note:
      "想いはある。\n" +
      "でも、言葉にしきれていない。\n\n" +
      "対話と映像で、\n" +
      "言葉になる前の想いを、外に出していく。\n\n" +
      "発信を重ねるほど、\n" +
      "共鳴する人が集まり、味方が増えていく。\n\n" +
      "バズのためではなく、\n" +
      "共感で選ばれるための縦型ドキュメンタリー。",
  },
  proof: {
    items: [
      { label: "制作期間", value: "約6ヶ月（開店前）" },
      { label: "主要フォーマット", value: "縦動画 / ミニドキュメンタリー" },
      { label: "成果軸", value: "来店・問い合わせ・採用DM" },
    ],
  },
concept: {
  title: "想いは、伝え方で届き方が変わる。",
  body:
    "私たちが向き合っているのは、再生数や一時的な話題ではありません。\n\n" +
    "どんな想いで、場をつくっているのか。\n" +
    "どんな人が、そこに立っているのか。\n" +
    "そして、なぜ今、それを伝えるのか。\n\n" +
    "立ち上げ前という、最も正直で、まだ整いきっていない時間。\n\n" +
    "その瞬間を、過剰に飾ることなく、ありのままに残すことで、\n" +
    "共感は静かに広がっていきます。",
  points: [
    { icon: "sig", text: "サービスや商品ではなく、想いと人柄を伝える設計" },
    { icon: "hourglass", text: "完璧ではない時間を、そのまま価値として残す" },
    { icon: "path", text: "共感を起点に、行動へつながる導線をつくる" },
  ],
},
  flow: {
    title: "受注後の流れ（最短で形にする）",
    lead:
      "やることを増やしすぎず、必要な順番で進めます。\nまずは『見せる骨格』を固め、その後に撮影と編集を積み上げます。",
    steps: [
      {
        k: "STEP 0",
        t: "キックオフ（30-45分）",
        d: "目的・ターゲット・媒体（IG/TikTok/LP）と、‘動かしたい行動’を確認。素材の棚卸しもここで。",
      },
      {
        k: "STEP 1",
        t: "設計（企画・構成・撮影設計）",
        d: "ミニドキュメンタリーの型に落とし込み。質問設計／カット割り／必要素材リストを作成。",
      },
      {
        k: "STEP 2",
        t: "撮影（1回 or 分割）",
        d: "インタビュー＋場の温度（B-roll）をセットで収録。‘盛らない’前提で画を揃える。",
      },
      {
        k: "STEP 3",
        t: "編集（初稿→修正→納品）",
        d: "縦最適化／テンポ／字幕設計。初稿提出→1-2回調整→納品（mp4 / サムネ / テロップ）。",
      },
      {
        k: "STEP 4",
        t: "運用（必要なら）",
        d: "投稿文・CTA・導線（フォーム／DM）を整備。反応を見て次回の設計に反映。",
      },
    ],
    deliverables: [
      "企画・構成メモ（Notion / PDF）",
      "撮影設計（質問・カット割り・素材リスト）",
      "縦動画：初稿 + 納品データ（mp4）",
      "サムネ（png）/ テロップ仕様",
    ],
  },
  fit: {
  title: "この取り組みが合う方 / 合わないかもしれない方",
  good: [
    "自分たちの想いを、きちんと伝えたい",
    "商品やサービスだけでなく、人も含めて価値だと考えている",
    "集客・採用・ファンづくりを一つの流れで設計したい",
    "短期的な数字より、長く続く関係を大切にしたい",
  ],
  bad: [
    "即効性や話題性を最優先に考えている",
    "流行フォーマットを短期間で量産したい",
    "映像を単発の施策として完結させたい",
  ],
},
  cta: {
    title: "まず、話しましょう。",
    body:
      "言葉が整っていなくても構いません。\n" +
      "むしろ、その前の段階から始めます。\n\n" +
      "・何を発信すればいいかわからない\n" +
      "・SNSに違和感がある\n" +
      "・共感してくれる人だけと、つながりたい\n\n" +
      "一つでも当てはまれば、話はできます。",
    button: "対話の入口へ",
  },
} as const;

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.28em] text-neutral-300 uppercase">
      {children}
    </span>
  );
}

function Divider() {
  return (
    <span className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight [text-wrap:balance]">
      <span className="relative inline-block">
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-[10px] bg-gradient-to-r from-white/30 via-white/10 to-transparent blur-[2px]"
        />
      </span>
    </h2>
  );
}

type ConceptIconName = "sig" | "hourglass" | "path";

function ConceptLineIcon({ name }: { name: ConceptIconName }) {
  const common = "h-7 w-7 text-white/85";

  if (name === "sig") {
    // Signature / identity
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path
          d="M4 16c2.5-4.5 5-6 7.2-4.7 2 1.2 1.6 4.2-.4 5.2-2.3 1.1-5-.3-4.7-2.8.5-3.5 6-8.2 10.7-6.7C16 8.2 18 11 20 16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "hourglass") {
    // Time / imperfect moment
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
        <path d="M7 4h10M7 20h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M8 4c0 4 4 5 4 8s-4 4-4 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4c0 4-4 5-4 8s4 4 4 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10.2 12h3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  // Path / guidance
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={common}>
      <path
        d="M6 18c0-4.5 3.5-8 8-8h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 18h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ProseCard({
  children,
  tone = "soft",
}: {
  children: ReactNode;
  tone?: "soft" | "ink";
}) {
  const base =
    "rounded-2xl border border-white/10 p-5 sm:p-6 leading-relaxed";
  const soft = "bg-white/5";
  const ink = "bg-black/25";

  return (
    <div className={`${base} ${tone === "ink" ? ink : soft}`}>{children}</div>
  );
}

const btnBase =
  "inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

const btnGhost =
  btnBase +
  " border-white/10 bg-white/5 text-neutral-200/90 hover:bg-white/10";

const btnPrimary =
  btnBase +
  " relative overflow-hidden border-white/15 bg-white/10 text-white hover:border-white/20";

function PrimaryButton({
  href,
  children,
  className = "",
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a href={href} target={target} rel={rel} className={`${btnPrimary} ambient-glow ${className}`}>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-r from-amber-200/30 via-amber-100/10 to-amber-300/25" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

function GhostButton({
  href,
  children,
  className = "",
  target,
  rel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a href={href} target={target} rel={rel} className={`${btnGhost} ${className}`}>
      <span className="inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

function ConceptStage({
  title,
  body,
  points,
}: {
  title: string;
  body: string;
  points: readonly { icon: ConceptIconName; text: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-transparent p-6 sm:p-8 space-y-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:44px_44px]" />

      {/* Title */}
      <h3 className="relative z-10 text-2xl sm:text-3xl font-semibold tracking-tight [text-wrap:balance]">
        {title}
      </h3>

      {/* Body */}
      <div className="relative z-10 rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="whitespace-pre-line text-sm sm:text-base text-neutral-200/90 leading-relaxed">
          {body}
        </p>
      </div>

      {/* Points */}
      <div className="relative z-10 grid gap-4 sm:grid-cols-2">
        {points.map((p, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition"
          >
            <p className="text-[11px] tracking-[0.24em] text-neutral-400 mb-3">
              POINT {String(i + 1).padStart(2, "0")}
            </p>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/25 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <ConceptLineIcon name={p.icon} />
              </span>
              <p className="text-sm sm:text-base text-neutral-100/90 leading-relaxed">
                {p.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoftCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="relative pl-14" aria-hidden="true">
      <div className="absolute left-[20px] top-0 bottom-0 w-px bg-gradient-to-b from-white/25 via-white/10 to-transparent" />
      <div className="h-6" />
    </div>
  );
}

function FlowStepCard({
  step,
  index,
}: {
  step: (typeof copy.flow.steps)[number];
  index: number;
}) {
  const stepNo = String(index + 1).padStart(2, "0");
  return (
    <div className="relative pl-14">
      <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/25 text-xs text-neutral-100/90">
        {stepNo}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]">
        <p className="text-[11px] tracking-[0.24em] text-neutral-400">STEP {stepNo}</p>
        <p className="mt-1 text-sm font-medium text-neutral-100/90">{step.t}</p>
        <p className="mt-2 text-sm text-neutral-200/80 leading-relaxed">{step.d}</p>
      </div>
    </div>
  );
}

function WorkCard({ w }: { w: (typeof works)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <SoftCard className="p-4 space-y-3">
      <div className="space-y-1">
        <p className="text-sm font-medium">{w.title}</p>
        <p className="text-xs text-neutral-400">{w.caption}</p>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950 transition-all duration-300 hover:border-white/20"
        style={{ aspectRatio: "9 / 16" }}
      >
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 h-full w-full"
            aria-label={`Play ${w.title}`}
          >
            <img
              src={w.poster}
              alt={w.title}
              loading="lazy"
              className="h-full w-full object-cover brightness-110 contrast-105"
            />
            <span className="absolute inset-0 bg-black/20" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs text-white backdrop-blur transition-transform duration-300 hover:scale-[1.04]">
              ▶ Play
            </span>
          </button>
        ) : (
          <video
            className="h-full w-full object-cover brightness-110 contrast-105"
            src={w.src}
            poster={w.poster}
            controls
            playsInline
            autoPlay
            preload="metadata"
          />
        )}
      </div>
    </SoftCard>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const [heroVideoOk, setHeroVideoOk] = useState(true);

  const nav = useMemo(
    () => [
      { id: "profile", label: "Profile" },
      { id: "concept", label: "Concept" },
      { id: "works", label: "Works" },
      { id: "flow", label: "Flow" },
      { id: "fit", label: "Fit" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <style jsx global>{`
        .quote-bar {
          position: relative;
        }
        .quote-bar:before {
          content: "";
          position: absolute;
          left: -12px;
          top: 2px;
          bottom: 2px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.55),
            rgba(255, 255, 255, 0.08)
          );
        }
      `}</style>
      {/* Subtle noise grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/6 via-transparent to-transparent" />

      {/* Top glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs tracking-widest">
              AD
            </span>
            <div className="leading-tight">
              <p className="text-[11px] tracking-[0.24em] text-neutral-400">
                {copy.hero.brand}
              </p>
              <p className="text-sm font-medium">{copy.hero.headline}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-4">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-xs text-neutral-300/90 hover:text-white transition"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <PrimaryButton href={FORM_URL} target="_blank" rel="noopener noreferrer" className="px-5">
              {copy.cta.button}
            </PrimaryButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28 space-y-20">
        {/* HERO */}
        <section className="pt-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/12 to-white/6 p-6 sm:p-10">
            <div className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full bg-white/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/12 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs tracking-[0.28em] text-neutral-300/80 uppercase">
                  {copy.hero.subhead}
                </p>

                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.02]">
                  <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                    {copy.hero.headline}
                  </span>
                </h1>

                <ProseCard tone="ink">
                  <p className="quote-bar pl-2 text-sm sm:text-base text-neutral-200/90 whitespace-pre-line">
                    {copy.hero.note}
                  </p>
                </ProseCard>


              </div>

              <div className="lg:justify-self-end">
                <div className="relative w-full max-w-[340px] overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/60 shadow-[0_30px_90px_rgba(0,0,0,0.6)] ambient-float">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
                    {heroVideoOk ? (
                      <video
                        className="h-full w-full object-cover brightness-110 contrast-105"
                        src={HERO_VIDEO}
                        poster={HERO_POSTER}
                        autoPlay
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        controls={false}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        aria-label="Hero video"
                        onError={() => setHeroVideoOk(false)}
                      />
                    ) : (
                      <img
                        src={HERO_POSTER}
                        alt="Hero"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <noscript>
                      <img
                        src={HERO_POSTER}
                        alt="Hero"
                        className="h-full w-full object-cover"
                      />
                    </noscript>
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 text-xs text-neutral-300/80">
                    <span>Ambient cut</span>
                    <span className="text-neutral-500">9:16</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-neutral-500 leading-relaxed">
                  ※ 自動再生は <span className="text-neutral-300">muted</span> +
                  <span className="text-neutral-300"> playsInline</span> が必須。
                  iOS/一部ブラウザでは条件により停止することがあります。
                </p>
              </div>
            </div>
          </div>
        </section>

        

        {/* CONCEPT */}
        <section id="concept" className="space-y-5 scroll-mt-28">
          <div className="flex items-center gap-3">
            <Pill>Concept</Pill>
            <Divider />
          </div>

          <ConceptStage
            title={copy.concept.title}
            body={copy.concept.body}
            points={copy.concept.points}
          />
        </section>

        {/* WORKS */}
        <section id="works" className="space-y-6 scroll-mt-28">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Pill>Works</Pill>
              <Divider />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              WORKS｜事例：ALBERTO（湘南のポーカースペース）
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-200/90 leading-relaxed">
              湘南にあるポーカースペース「ALBERTO」の立ち上げを、
              “ギャンブル”ではなく「コミュニケーションの場」として伝えるために、
              縦型ミニドキュメンタリーを設計しました。
            </p>
            <p className="text-sm sm:text-base text-neutral-200/90 leading-relaxed">
              オーナーの想い、スタッフとの関係性、地域スポンサーとのつながり。
              言葉になる前の温度を拾い、来店・問い合わせ・採用DMにつながる導線へ落とし込みます。
            </p>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="mb-4 text-sm tracking-widest text-neutral-400">
                RESULTS（抜粋）
              </p>
              <ul className="space-y-2 text-sm text-neutral-100/90">
                <li>・初月 来店数：326名</li>
                <li>・平均客単価：5,500円</li>
                <li>・売上の約75%がInstagram導線</li>
                <li>・3ヶ月間でInstagram経由売上 240万円以上</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-400">
                ※ オープン初期〜3ヶ月の範囲での記録です
              </p>
            </div>
            <ProseCard>
              <p className="text-sm sm:text-base text-neutral-200/90">
                6本は「テンプレ」ではなく、一本ごとに役割が違う“設計ログ”。
                人柄→関係性→空気→行動 の順で、共感を行動につなげていきます。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200/90">
                  人柄
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200/90">
                  関係性
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200/90">
                  空気
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200/90">
                  行動
                </span>
              </div>
            </ProseCard>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {works.map((w, i) => (
              <WorkCard key={i} w={w} />
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-sm text-neutral-200/90 leading-relaxed">
              それぞれの動画は、役割が違います。
              <span className="text-white"> 信頼</span>・<span className="text-white">関係性</span>・<span className="text-white">空気</span>を、段階的に伝えるための並びです。
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] tracking-wide text-neutral-400">#01-02</p>
                <p className="mt-1 text-sm text-neutral-100/90">人物の信頼を立ち上げる</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] tracking-wide text-neutral-400">#03-04</p>
                <p className="mt-1 text-sm text-neutral-100/90">関係性と進捗を可視化する</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] tracking-wide text-neutral-400">#05-06</p>
                <p className="mt-1 text-sm text-neutral-100/90">空気で惹きつけて行動へ</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <GhostButton
                href={ALBERTO_IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5"
              >
                制作したポーカバーのアカウントを見る（Instagram） <span className="text-neutral-500">↗</span>
              </GhostButton>
              <PrimaryButton href="#contact" className="px-7">
                相談へ進む
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section id="flow" className="space-y-6 scroll-mt-28">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Pill>Flow</Pill>
              <Divider />
            </div>
            <SectionTitle>{copy.flow.title}</SectionTitle>
            <ProseCard>
              <p className="whitespace-pre-line text-sm sm:text-base text-neutral-200/90">
                {copy.flow.lead}
              </p>
            </ProseCard>
          </div>

          <div className="space-y-0">
            {copy.flow.steps.map((s, i) => (
              <div key={i}>
                <FlowStepCard step={s} index={i} />
                {i !== copy.flow.steps.length - 1 ? <FlowConnector /> : null}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="text-sm font-medium text-neutral-100/90">納品物（基本セット）</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-neutral-200/80 space-y-1">
              {copy.flow.deliverables.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROFILE */}
        <section id="profile" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <Pill>Profile</Pill>
            <Divider />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative grid gap-8 lg:grid-cols-[0.55fr_1fr] lg:items-center">
              <div className="mx-auto w-full max-w-[320px]">
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/25 shadow-[0_30px_90px_rgba(0,0,0,0.55)] group">
                  <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
                    <img
                      src={PROFILE_IMAGE}
                      alt="剛力大介のプロフィール写真"
                      className="h-full w-full object-cover grayscale contrast-110 brightness-95 transition duration-500 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-[11px] tracking-[0.24em] text-neutral-400">縦型ドキュメンタリー制作者</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">剛力大介</h2>
                  <p className="text-sm sm:text-base text-neutral-200/90 leading-relaxed">
                    想いを整理し、伝わる形に整えるところから伴走します。
                    <br />
                    反応が“静かに強く”積み上がる発信を、一緒に設計します。
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] tracking-[0.24em] text-neutral-400">強み</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-200/85 leading-relaxed">
                      <li>・ヒアリングで“言葉になる前”を拾う</li>
                      <li>・縦動画の構成とテンポ設計</li>
                      <li>・導線（来店/問合せ/採用）まで一体で設計</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] tracking-[0.24em] text-neutral-400">スタンス</p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-200/85 leading-relaxed">
                      <li>・盛らない、でも退屈にしない</li>
                      <li>・続けられる形に落とし込む</li>
                      <li>・人柄と関係性を、信頼に変える</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton href="#contact" className="px-7">
                    まず話を聞かせてください
                  </PrimaryButton>
                  <GhostButton
                    href={GORIKI_IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7"
                  >
                    制作・日々の記録を見る（Instagram） <span className="text-neutral-500">↗</span>
                  </GhostButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FIT */}
        <section id="fit" className="space-y-6 scroll-mt-28">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Pill>Fit</Pill>
              <Divider />
            </div>
            <SectionTitle>{copy.fit.title}</SectionTitle>
            <p className="text-sm text-neutral-400 leading-relaxed">
              目的やスタンスが合うほど、反応は“静かに強く”なります。
            </p>
          </div>

          <div className="grid gap-4 sm:[grid-template-columns:1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.24em] text-neutral-400">RECOMMENDED</p>
                  <p className="mt-1 text-sm font-medium text-neutral-100/95">合う方</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-neutral-200/90">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5 text-white/90">
                      <path d="M20 7L10 17l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Fit
                </span>
              </div>

              <ul className="relative mt-4 grid gap-2">
                {copy.fit.good.map((t, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-100/90 leading-relaxed"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 opacity-80 hover:opacity-95 transition">
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-white/10" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.24em] text-neutral-500">NOT FOR YOU (maybe)</p>
                  <p className="mt-1 text-sm font-medium text-neutral-200/85">合わないかもしれない方</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-neutral-300/80">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-black/20">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5 text-white/70">
                      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  Check
                </span>
              </div>

              <ul className="relative mt-4 list-disc pl-5 text-sm text-neutral-200/70 space-y-2">
                {copy.fit.bad.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="text-center space-y-4 pt-4">
          <div className="mx-auto flex max-w-xl items-center gap-3 justify-center">
            <Pill>Contact</Pill>
            <span className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {copy.cta.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-200/90 whitespace-pre-line leading-relaxed">
            {copy.cta.body}
          </p>

          <div className="pt-1">
            <PrimaryButton href={FORM_URL} target="_blank" rel="noopener noreferrer" className="px-9 py-3">
              {copy.cta.button}
            </PrimaryButton>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed">
            ※ すべてのご相談をお受けするわけではありません。<br />
            方向性が合う場合のみ、次のステップをご案内します。
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            © {year} AMBIENT DOC
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a href="#works" className="hover:text-neutral-200 transition">
  Works
</a>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-200 transition"
            >
              Contact ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
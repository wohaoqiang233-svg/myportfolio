import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  bi,
  email,
  profile,
  projects,
  type Block,
  type Copy,
  type Lang,
  type Media,
  type Project,
} from "./content/projects";
import "./styles.css";

const Language = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});
function useCopy() {
  const { lang } = useContext(Language);
  return (text: Copy) => text[lang];
}
const accents = {
  pink: "text-softpink",
  blue: "text-periwinkle",
  lime: "text-lime",
};
const accentsBg = { pink: "bg-pink", blue: "bg-periwinkle", lime: "bg-lime" };
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden="true" className="text-xl">
      {down ? "↓" : "↗"}
    </span>
  );
}
function Stripe() {
  return (
    <div aria-hidden="true" className="flex h-[3px] w-full">
      <span className="flex-[4] bg-pink" />
      <span className="flex-[3] bg-indigo" />
      <span className="flex-[3] bg-lime" />
      <span className="flex-1 bg-ink" />
    </div>
  );
}
function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow text-softpink ${className}`}>{children}</p>;
}
function SectionTitle({
  index,
  title,
  aside,
}: {
  index: string;
  title: Copy;
  aside?: Copy;
}) {
  const t = useCopy();
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Label>[ {index} ]</Label>
        <h2 className="section-title mt-2">{t(title)}</h2>
      </div>
      {aside && <p className="eyebrow max-w-sm text-muted">{t(aside)}</p>}
    </div>
  );
}

function Header() {
  const { lang, setLang } = useContext(Language);
  const t = useCopy();
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-30 bg-canvas border-b border-line">
      <div className="shell flex min-h-18 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Link
          className="font-display text-lg font-bold tracking-tight hover:text-softpink"
          to="/"
        >
          SUN JIACHEN
        </Link>
        <nav
          aria-label={t(bi("主导航", "Main navigation"))}
          className="flex flex-wrap items-center gap-1 text-sm"
        >
          <Link
            className="px-3 py-2 hover:bg-panel hover:text-softpink"
            to="/#work"
            aria-current={loc.hash === "#work" ? "location" : undefined}
          >
            {t(bi("作品", "Work"))}
          </Link>
          <Link
            className="px-3 py-2 hover:bg-panel hover:text-softpink"
            to="/#about"
          >
            {t(bi("关于", "About"))}
          </Link>
          <Link
            className="px-3 py-2 hover:bg-panel hover:text-softpink"
            to="/#contact"
          >
            {t(bi("联系", "Contact"))}
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${email}`}
            className="hidden text-xs text-muted hover:text-softpink xl:block"
          >
            {email}
          </a>
          <div
            className="flex border border-line p-1 text-sm"
            aria-label={t(bi("语言", "Language"))}
          >
            {(["zh", "en"] as const).map((l) => (
              <button
                key={l}
                lang={l === "zh" ? "zh-CN" : "en"}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={`min-h-8 px-3 ${lang === l ? "bg-ink text-canvas" : "text-muted hover:text-ink"}`}
              >
                {l === "zh" ? "中文" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Stripe />
    </header>
  );
}
function Footer() {
  const t = useCopy();
  return (
    <footer className="border-t border-line bg-deep">
      <div className="shell py-10">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-8">
          <div>
            <p className="font-display text-lg font-semibold">
              SUN JIACHEN — UX / Interaction Designer
            </p>
            <p className="mt-2 text-sm text-muted">
              {t(
                bi(
                  "交互流程 · 原型制作 · 可用性测试",
                  "Interaction flows · Prototyping · Usability testing",
                ),
              )}
            </p>
          </div>
          <a
            className="break-all text-softpink hover:text-ink"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} Sun Jiachen</span>
          <Link className="hover:text-ink" to="/#work">
            {t(bi("返回作品列表 ↑", "Back to selected work ↑"))}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function MediaFigure({
  media,
  wide = false,
  compact = false,
}: {
  media: Media;
  wide?: boolean;
  compact?: boolean;
}) {
  const t = useCopy();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  return (
    <figure className="min-w-0 border border-line bg-deep">
      <button
        ref={trigger}
        disabled={failed}
        onClick={() => {
          dialog.current?.showModal();
          document.body.style.overflow = "hidden";
        }}
        aria-label={t(bi("查看大图：", "Enlarge image: ")) + t(media.caption)}
        className="group block w-full text-left disabled:cursor-default"
      >
        {failed ? (
          <div className="flex min-h-56 items-center justify-center p-8 text-muted">
            {t(bi("图片暂时无法显示", "Image unavailable"))}
          </div>
        ) : (
          <img
            src={media.src}
            alt={t(media.caption)}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`w-full object-contain ${wide ? "max-h-[540px] min-h-64" : compact ? "h-56" : "h-72 xl:h-80"} transition-opacity group-hover:opacity-85`}
          />
        )}
        <span className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2 text-xs text-muted">
          <span>{t(media.caption)}</span>
          {!failed && (
            <span aria-hidden="true">{t(bi("放大 ↗", "Enlarge ↗"))}</span>
          )}
        </span>
      </button>
      {media.example && (
        <figcaption className="border-t border-line px-3 py-2 text-xs text-lime">
          {t(
            bi(
              "视觉示例 · 待替换为真实项目素材",
              "Visual example · Replace with original project material",
            ),
          )}
        </figcaption>
      )}
      <dialog
        ref={dialog}
        onClose={() => {
          document.body.style.overflow = "";
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-label={t(media.caption)}
        className="fixed inset-0 m-auto max-h-[94vh] w-[94vw] max-w-[1500px] border border-line bg-panel p-0 text-ink"
      >
        <div className="sticky top-0 flex flex-wrap items-center justify-between gap-4 border-b border-line bg-panel px-5 py-3">
          <p>{t(media.caption)}</p>
          <button autoFocus className="button-secondary" onClick={close}>
            {t(bi("关闭", "Close"))} <span aria-hidden="true">×</span>
          </button>
        </div>
        <img
          src={media.src}
          alt={t(media.caption)}
          className="mx-auto max-h-[74vh] w-full object-contain"
        />
        {media.example && (
          <p className="p-4 text-sm text-lime">
            {t(
              bi(
                "这是 Stitch 视觉示例，不是已验证的项目成果。",
                "This is a Stitch visual example, not a verified project outcome.",
              ),
            )}
          </p>
        )}
      </dialog>
    </figure>
  );
}
function Blocks({ items, cols = 3 }: { items: Block[]; cols?: 2 | 3 | 4 }) {
  const t = useCopy();
  return (
    <div
      className={`grid gap-4 ${cols === 2 ? "grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]" : "grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))]"}`}
    >
      {items.map((item, i) => (
        <article key={i} className="min-w-0 border border-line bg-panel p-6">
          <Label className="mb-4">[ {String(i + 1).padStart(2, "0")} ]</Label>
          <h3 className="font-display text-xl font-semibold leading-snug">
            {t(item.title)}
          </h3>
          <p className="mt-3 text-muted">{t(item.body)}</p>
        </article>
      ))}
    </div>
  );
}
function Gallery({ media }: { media: Media[] }) {
  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {media.map((m) => (
        <MediaFigure key={m.src} media={m} />
      ))}
    </div>
  );
}
function Facts({ items }: { items: Block[] }) {
  const t = useCopy();
  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] gap-px bg-line">
      {items.map((f, i) => (
        <div key={i} className="min-w-0 bg-panel p-5">
          <dt className="eyebrow text-muted">{t(f.title)}</dt>
          <dd
            className={`mt-2 font-display text-lg font-semibold ${i % 3 === 0 ? "text-softpink" : i % 3 === 1 ? "text-periwinkle" : "text-lime"}`}
          >
            {t(f.body)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Monogram() {
  const t = useCopy();
  return (
    <div
      className="flex min-h-80 flex-col justify-between border border-line bg-panel p-6 lg:min-h-[390px]"
      aria-hidden="true"
    >
      <div className="eyebrow flex justify-between gap-4 text-muted">
        <span>FORM / INTERACTION</span>
        <span className="text-softpink">+</span>
      </div>
      <svg viewBox="0 0 440 235" className="my-4 w-full" fill="none">
        <g stroke="#41464b" strokeWidth="1" strokeDasharray="3 5">
          <path d="M20 30H420M20 205H420M20 118H420M125 10V225M315 10V225" />
          <circle cx="125" cy="77" r="50" />
          <circle cx="125" cy="166" r="50" />
        </g>
        <g stroke="#f1efe7" strokeWidth="1.2">
          <path d="M171 61C151 14 80 18 72 61C61 113 173 101 175 151C177 207 83 219 65 174M254 204V31H276L351 171V31H376V204H349L280 68V204Z" />
        </g>
        <path stroke="#ea437f" d="M14 30H28M21 23V37M406 205H420M413 198V212" />
      </svg>
      <div className="eyebrow mb-4 flex justify-between text-muted">
        <span>{t(bi("细节创造清晰", "Details create clarity"))}</span>
        <span>01 / 04</span>
      </div>
      <Stripe />
    </div>
  );
}
function HomeProject({
  project,
  compact = false,
  reverse = false,
}: {
  project: Project;
  compact?: boolean;
  reverse?: boolean;
}) {
  const t = useCopy();
  return (
    <article className="border border-line bg-panel transition-colors hover:border-muted">
      <div className={`h-[3px] ${accentsBg[project.accent]}`} />
      <div
        className={`grid gap-7 p-6 lg:p-7 ${compact ? "" : "lg:grid-cols-12 lg:items-center"}`}
      >
        <div
          className={`${compact ? "order-2" : `lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}`}
        >
          <p className={`eyebrow ${accents[project.accent]}`}>
            [ {project.index} / {t(project.type)} ]
          </p>
          <h3
            className={`mt-4 font-display font-bold tracking-tight leading-tight ${compact ? "text-2xl" : "text-3xl xl:text-[36px]"}`}
          >
            <Link className="hover:text-softpink" to={`/work/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-lg text-ink">{t(project.subtitle)}</p>
          <p className="mt-4 text-muted">{t(project.summary)}</p>
          {!compact && (
            <div className="mt-6">
              <Facts items={project.facts.slice(0, 3)} />
            </div>
          )}
          <Link
            className={`mt-6 inline-flex min-h-12 items-center gap-4 border-b py-2 font-semibold ${accents[project.accent]} hover:text-ink`}
            to={`/work/${project.slug}`}
          >
            {t(bi("查看项目", "View project"))}
            <Arrow />
          </Link>
        </div>
        <div
          className={`${compact ? "order-1" : `lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}`}
        >
          <MediaFigure media={project.cover} compact={compact} />
        </div>
      </div>
    </article>
  );
}
function CopyEmail() {
  const t = useCopy();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);
  return (
    <div>
      <button
        type="button"
        className="button-secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setStatus("ok");
          } catch {
            setStatus("error");
          }
        }}
      >
        {t(bi("复制邮箱", "Copy email"))} <span aria-hidden="true">⧉</span>
      </button>
      <p
        role="status"
        className={`mt-2 max-w-md text-sm ${status === "error" ? "text-softpink" : "text-lime"}`}
      >
        {status === "ok"
          ? t(bi("邮箱地址已复制。", "Email address copied."))
          : status === "error"
            ? t(
                bi(
                  "未能复制，请选中上方邮箱地址手动复制。",
                  "Could not copy. Please select and copy the email address above.",
                ),
              )
            : null}
      </p>
    </div>
  );
}
function Home() {
  const t = useCopy();
  return (
    <>
      <div className="shell">
        <section className="section-space">
          <div className="mb-7 flex flex-wrap justify-between gap-4">
            <Label>[ 01 / UX · INTERACTION DESIGNER ]</Label>
            <p className="eyebrow text-muted">
              {t(
                bi(
                  "精选作品 / SUN JIACHEN",
                  "SELECTED PORTFOLIO / SUN JIACHEN",
                ),
              )}
            </p>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="font-display text-[72px] font-bold leading-[.95] tracking-[-.065em] sm:text-[100px] xl:text-[116px]">
                SUN
                <br />
                JIACHEN
              </h1>
              <h2 className="mt-7 font-display text-2xl font-semibold">
                {t(
                  bi(
                    "数字、实体与人的交互。",
                    "Digital. Physical. Interaction.",
                  ),
                )}
              </h2>
              <p className="mt-3 text-lg text-softpink">
                {t(
                  bi(
                    "用研究与原型，探索更清晰的体验。",
                    "Exploring clearer experiences through research and prototyping.",
                  ),
                )}
              </p>
              <p className="mt-4 max-w-xl text-lg text-muted">
                {t(profile.intro)}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a className="button-primary" href="#work">
                  {t(bi("查看作品", "View selected work"))}
                  <Arrow down />
                </a>
                <span className="eyebrow text-muted">
                  04 / {t(bi("项目", "PROJECTS"))}
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Monogram />
            </div>
          </div>
          <div className="mt-12">
            <Stripe />
          </div>
        </section>
        <section
          id="about"
          className="section-space border-y border-line bg-deep px-6 lg:px-8"
        >
          <SectionTitle
            index="02 / PROFILE"
            title={bi("个人介绍与核心能力", "About & capabilities")}
          />
          <p className="border-l-2 border-pink bg-panel p-6 text-lg leading-relaxed">
            {t(profile.about)}
          </p>
          <div className="mt-6">
            <Blocks
              items={[
                {
                  title: bi("交互流程设计", "Interaction flow"),
                  body: bi(
                    "从用户需求与任务出发，梳理信息、操作顺序与反馈，让体验的下一步更清楚。",
                    "Start with user needs and tasks. Make information, action sequences and feedback easier to understand.",
                  ),
                },
                {
                  title: bi("原型制作", "Prototyping"),
                  body: bi(
                    "通过纸面、数字和实体原型，把设计想法转化为可以体验和讨论的方案。",
                    "Turn ideas into experiences that can be explored and discussed through paper, digital and physical prototypes.",
                  ),
                },
                {
                  title: bi("可用性测试", "Usability testing"),
                  body: bi(
                    "观察实际使用中的困难，让反馈推动交互与原型的下一轮调整。",
                    "Observe difficulties in use and bring feedback into the next iteration of the interaction and prototype.",
                  ),
                },
              ]}
            />
          </div>
          <div className="mt-6 border-t border-line pt-5 text-sm text-muted">
            <span className="eyebrow mr-5 text-softpink">TOOLS</span>
            {t(
              bi(
                "Figma、Photoshop、Illustrator / 用户访谈、问卷、分析 / Blender、Unity、Rhino / Python 基础、生成式 AI",
                "Figma, Photoshop, Illustrator / Interviews, surveys, analysis / Blender, Unity, Rhino / Python basics, generative AI",
              ),
            )}
          </div>
        </section>
        <section id="work" className="section-space">
          <SectionTitle
            index="03 / SELECTED WORK"
            title={bi("项目展示", "Selected interaction cases")}
            aside={bi(
              "四个项目，从研究到体验",
              "Four projects, from research to experience",
            )}
          />
          <div className="space-y-7">
            <HomeProject project={projects[0]} />
            <HomeProject project={projects[1]} reverse />
            <div className="grid gap-7 md:grid-cols-2">
              <HomeProject project={projects[2]} compact />
              <HomeProject project={projects[3]} compact />
            </div>
          </div>
        </section>
        <section id="contact" className="section-space border-t border-line">
          <SectionTitle
            index="04 / CONTACT"
            title={bi("聊聊设计与新的可能。", "Let’s talk about design.")}
          />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 border border-line bg-panel p-7 lg:col-span-8">
              <p className="eyebrow text-muted">
                {t(bi("邮件联系", "GET IN TOUCH"))}
              </p>
              <a
                className="mt-5 block break-all font-display text-2xl font-semibold hover:text-softpink lg:text-3xl"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <p className="mt-4 max-w-xl text-muted">
                {t(
                  bi(
                    "欢迎联系，进一步了解我的项目、设计过程与合作机会。",
                    "Get in touch to discuss my projects, design process and opportunities to work together.",
                  ),
                )}
              </p>
              <div className="mt-7 flex flex-wrap items-start gap-4">
                <a className="button-primary" href={`mailto:${email}`}>
                  {t(bi("发送邮件", "Send email"))}
                  <Arrow />
                </a>
                <CopyEmail />
              </div>
            </div>
            <aside className="border border-line bg-panel p-7 lg:col-span-4">
              <Label>[ DESIGN FOCUS ]</Label>
              <h3 className="mt-4 font-display text-2xl font-semibold">
                UX Designer
                <br />
                Interaction Designer
              </h3>
              <p className="mt-5 text-muted">
                {t(
                  bi(
                    "用户研究、交互流程、原型制作与测试。",
                    "User research, interaction flows, prototyping and testing.",
                  ),
                )}
              </p>
              <div className="mt-8">
                <Stripe />
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}

function Flow({ p }: { p: Project }) {
  const t = useCopy();
  return (
    <section className="section-space border-t border-line">
      <SectionTitle
        index="01 / INTERACTION FLOW"
        title={bi("关键交互流程", "Key interaction flow")}
      />
      {p.flowNote && (
        <p className="mb-5 border-l-2 border-lime pl-4 text-sm text-muted">
          {t(p.flowNote)}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {p.flow.map((item, i) => (
          <article
            key={i}
            className="flex flex-col border border-line bg-panel"
          >
            <div
              className={`h-[3px] ${i % 3 === 0 ? "bg-pink" : i % 3 === 1 ? "bg-periwinkle" : "bg-lime"}`}
            />
            <div className="p-5">
              <p className="eyebrow mb-4 text-muted">
                {t(bi("阶段", "STAGE"))} 0{i + 1}
                <span className="float-right" aria-hidden="true">
                  {i === 3 ? "□" : "→"}
                </span>
              </p>
              <h3 className="font-display text-xl font-semibold leading-snug">
                {t(item.title)}
              </h3>
              <p className="mt-3 text-muted">{t(item.body)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function ResearchDrawers({ p }: { p: Project }) {
  const t = useCopy();
  const drawers = [
    {
      title: bi("研究过程", "Research process"),
      blocks: p.research,
      media: p.researchMedia,
    },
    {
      title: bi("原型制作与迭代", "Prototypes & iterations"),
      blocks: p.prototype,
      media: p.slug === "reclimb" ? p.prototypeMedia.slice(2) : p.prototypeMedia,
    },
    {
      title: bi("测试记录与反馈", "Testing records & feedback"),
      blocks: p.testing,
      media: p.testingMedia,
    },
  ];
  return (
    <section className="section-space border-t border-line">
      <SectionTitle
        index="05 / DEEP DIVE"
        title={bi(
          "研究、原型与测试档案",
          "Research, prototypes & testing archives",
        )}
        aside={bi("按需展开，进一步了解过程", "Expand to explore the process")}
      />
      <div className="space-y-3">
        {drawers.map((d, i) => (
          <details
            key={p.slug + i}
            open={
              i ===
              (p.slug === "reclimb" || p.slug === "reduce-food-waste" ? 0 : 1)
            }
            className="group border border-line bg-panel"
          >
            <summary className="flex min-h-16 items-center justify-between gap-4 p-5 hover:bg-line/40">
              <span>
                <span className="eyebrow mr-4 text-softpink">[ 0{i + 1} ]</span>
                <span className="font-display text-lg font-semibold">
                  {t(d.title)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-xl group-open:hidden"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden font-mono text-xl group-open:inline"
              >
                −
              </span>
            </summary>
            <div className="border-t border-line p-5">
              <Blocks items={d.blocks} />
              {d.media.length > 0 ? (
                <Gallery media={d.media} />
              ) : (
                <p className="mt-5 border-l-2 border-lime pl-4 text-sm text-muted">
                  {t(
                    bi(
                      "原始研究图片、详细过程与记录待补充。",
                      "Original research images, detailed process and records are pending.",
                    ),
                  )}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
function Deliverables({ p }: { p: Project }) {
  const t = useCopy();
  return (
    <section className="section-space border-t border-line">
      <SectionTitle
        index="04 / OUTCOME"
        title={bi("设计成果与展示", "Design outcomes & presentation")}
      />
      {p.slug === "reclimb" ? (
        <>
          <div className="grid items-start gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MediaFigure media={p.finalMedia[0]} wide />
            </div>
            <div className="lg:col-span-5">
              <Blocks items={p.deliverables} cols={2} />
              <p className="mt-6 text-muted">
                {t(
                  bi(
                    "已有成果图片保留原貌；最终功能说明与反思待补充。",
                    "Existing outcome images are preserved. Final feature descriptions and reflections are pending.",
                  ),
                )}
              </p>
            </div>
          </div>
          <details className="group mt-6 border border-line">
            <summary className="flex items-center justify-between p-5">
              <span>
                {t(
                  bi(
                    "展开更多可穿戴与移动界面图片",
                    "View more wearable and mobile interface images",
                  ),
                )}
              </span>
              <span aria-hidden="true">＋</span>
            </summary>
            <div className="p-5 pt-0">
              <Gallery media={p.finalMedia.slice(1)} />
            </div>
          </details>
        </>
      ) : (
        <div className="grid gap-5 md:grid-cols-3">
          {p.deliverables.map((d, i) => (
            <article
              key={i}
              className="min-w-0 border border-line bg-panel p-5"
            >
              {p.finalMedia[i] && (
                <MediaFigure media={p.finalMedia[i]} compact />
              )}
              <Label className="mt-5">[ 0{i + 1} ]</Label>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {t(d.title)}
              </h3>
              <p className="mt-3 text-muted">{t(d.body)}</p>
              {!p.finalMedia[i] && (
                <p className="mt-4 text-sm text-lime">
                  {t(
                    bi(
                      "原始展示材料待补充",
                      "Original presentation material pending",
                    ),
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
function Methodology({ p }: { p: Project }) {
  const t = useCopy();
  const proto = (
    <>
      <SectionTitle
        index="02 / PROTOTYPING"
        title={bi("原型制作与设计发展", "Prototyping & design development")}
      />
      {p.slug === "reclimb" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            {p.prototypeMedia.slice(0, 2).map((m) => (
              <MediaFigure key={m.src} media={m} />
            ))}
          </div>
          <div className="space-y-6 border border-line bg-panel p-6">
            {p.prototype.map((d, i) => (
              <div key={i} className="border-b border-line pb-6 last:border-0">
                <Label>[ 0{i + 1} ]</Label>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {t(d.title)}
                </h3>
                <p className="mt-3 text-muted">{t(d.body)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Blocks items={p.prototype} />
      )}
    </>
  );
  const tests = (
    <>
      <SectionTitle
        index="03 / TESTING & ITERATION"
        title={bi("测试与迭代", "Testing & iteration")}
      />
      <Blocks items={p.testing} cols={2} />
    </>
  );
  if (p.slug === "plantfun-explorer")
    return (
      <section className="section-space grid gap-8 border-t border-line lg:grid-cols-12">
        <div className="lg:col-span-5">{proto}</div>
        <div className="lg:col-span-7">{tests}</div>
      </section>
    );
  if (p.slug === "reduce-food-waste")
    return (
      <section className="section-space border-t border-line">
        <SectionTitle
          index="02 / METHODOLOGY & ITERATION"
          title={bi(
            "服务原型与可用性迭代",
            "Service prototypes & usability iteration",
          )}
        />
        <p className="mb-6 max-w-3xl text-lg text-muted">
          {t(p.prototype[0].body)}
        </p>
        <Blocks items={p.testing} cols={2} />
      </section>
    );
  return (
    <>
      <section className="section-space border-t border-line">{proto}</section>
      <section className="section-space border-t border-line">{tests}</section>
    </>
  );
}
function CaseStudy({ p }: { p: Project }) {
  const t = useCopy();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <div className="shell">
      <div className="flex flex-wrap justify-between gap-5 border-b border-line py-6">
        <Link className="text-sm hover:text-softpink" to="/#work">
          ← {t(bi("返回全部项目", "Back to selected work"))}
        </Link>
        <p className="eyebrow text-muted">
          {p.index} / {t(p.type)}
        </p>
      </div>
      <section className="py-10">
        <div className="mb-6 grid gap-4 border border-line bg-panel p-4 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted">{t(bi("角色", "ROLE"))}</p>
            <p className="mt-1">{t(p.role)}</p>
          </div>
          <div>
            <p className="eyebrow text-muted">{t(bi("类型", "TYPE"))}</p>
            <p className="mt-1">{t(p.type)}</p>
          </div>
          <div>
            <p className="eyebrow text-muted">{t(bi("方法", "PROCESS"))}</p>
            <p className="mt-1">
              {t(bi("研究 → 原型 → 测试", "Research → Prototype → Test"))}
            </p>
          </div>
        </div>
        <Label>[ PROJECT {p.index} ]</Label>
        <div
          className={`mt-4 grid gap-7 ${p.slug === "reclimb" ? "lg:grid-cols-12" : ""}`}
        >
          <div className={p.slug === "reclimb" ? "lg:col-span-8" : ""}>
            <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight lg:text-5xl">
              {p.title}
              <span className="mt-3 block text-2xl font-medium leading-snug lg:text-3xl">
                {t(p.subtitle)}
              </span>
            </h1>
            <p className="mt-6 max-w-4xl text-lg text-muted">{t(p.summary)}</p>
          </div>
          <div className={p.slug === "reclimb" ? "lg:col-span-4" : ""}>
            <Facts items={p.facts} />
          </div>
        </div>
        {p.slug !== "reclimb" && (
          <div
            className={`mt-8 grid gap-6 ${p.slug === "plantfun-explorer" ? "lg:grid-cols-12" : ""}`}
          >
            <div
              className={p.slug === "plantfun-explorer" ? "lg:col-span-8" : ""}
            >
              <MediaFigure media={p.hero} wide />
            </div>
            {p.slug === "plantfun-explorer" && (
              <aside className="flex flex-col justify-between border border-line bg-panel p-6 lg:col-span-4">
                <div>
                  <Label>[ PHYSICAL / DIGITAL ]</Label>
                  <h2 className="mt-4 font-display text-2xl font-semibold">
                    {t(
                      bi(
                        "从感知到日常连接",
                        "From sensing to daily connection",
                      ),
                    )}
                  </h2>
                  <p className="mt-4 text-muted">
                    {t(
                      bi(
                        "技术研究探索可能的感知与交互机制，具体硬件与数据记录待补充。",
                        "Technical research explores possible sensing and interaction mechanisms. Hardware specifications and data records are pending.",
                      ),
                    )}
                  </p>
                </div>
                <div className="mt-8 border-t border-line pt-4 text-sm text-lime">
                  {t(
                    bi(
                      "传感数据与技术指标待验证",
                      "Sensor data and technical metrics await verification",
                    ),
                  )}
                </div>
              </aside>
            )}
          </div>
        )}
      </section>
      <Flow p={p} />
      <Methodology p={p} />
      <Deliverables p={p} />
      <ResearchDrawers p={p} />
      <section className="mb-14 flex flex-wrap items-center justify-between gap-6 border border-line bg-panel p-7">
        <div>
          <Label>
            {t(
              bi("继续探索 / 下一个项目", "CONTINUE EXPLORING / NEXT PROJECT"),
            )}
          </Label>
          <h2 className="mt-3 font-display text-2xl font-semibold">
            {next.title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="button-secondary" to="/#work">
            {t(bi("全部作品", "All work"))}
          </Link>
          <Link className="button-primary" to={`/work/${next.slug}`}>
            {t(bi("下一个项目", "Next project"))}
            <Arrow />
          </Link>
        </div>
      </section>
    </div>
  );
}
function NotFound() {
  const t = useCopy();
  return (
    <section className="shell py-24">
      <Label>404</Label>
      <h1 className="section-title mt-5">
        {t(bi("这个页面不存在", "This page could not be found"))}
      </h1>
      <Link className="button-primary mt-8" to="/">
        {t(bi("返回首页", "Return home"))}
      </Link>
    </section>
  );
}
function RouteEffects() {
  const { pathname, hash, key } = useLocation();
  const { lang } = useContext(Language);
  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView(),
      );
    } else window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    const project = projects.find((p) => pathname === `/work/${p.slug}`);
    document.title = project
      ? `${project.title} — Sun Jiachen`
      : "Sun Jiachen — UX / Interaction Designer";
  }, [pathname, lang]);
  return null;
}
function App() {
  const [lang, setLang] = useState<Lang>(() =>
    navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en",
  );
  return (
    <Language.Provider value={{ lang, setLang }}>
      <BrowserRouter>
        <RouteEffects />
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-3 z-50 bg-ink p-3 text-canvas focus:not-sr-only"
        >
          {lang === "zh" ? "跳至主要内容" : "Skip to content"}
        </a>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {projects.map((p) => (
              <Route
                key={p.slug}
                path={`/work/${p.slug}`}
                element={<CaseStudy key={p.slug} p={p} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Language.Provider>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

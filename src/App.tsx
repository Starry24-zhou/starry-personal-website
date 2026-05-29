import { motion, useInView, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatedLetter } from './components/AnimatedLetter';
import { WordsPullUp, WordsPullUpMultiStyle } from './components/WordsPullUp';

const heroVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';
const featureVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';
const resumeVideo = '/m2ohvc3120lud1oo2kerxjs47lj0jp9h1779804365631.mp4';
const hobbiesVideo = '/zu7lwolfxg352nd93ayuym9jbfz83xhg1779804424505.mp4';
const cardIcon01 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85';
const cardIcon03 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85';

const navItems = [
  { label: '首页', href: '#home' },
  { label: '个人简历', href: './resume.html' },
  { label: 'AI推荐', href: './portfolio.html' },
  { label: '个人爱好', href: './f1.html' },
  { label: '联系我', href: '#contact' },
];
const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  {
    number: '',
    id: 'resume',
    title: '个人简历',
    icon: cardIcon03,
    desc: '含 SFT 微调与 RAG 知识库项目落地经历，覆盖 AI 训练师全职履历、教育背景与技能总结。',
    items: [
      'SFT 微调与 RAG 知识库项目落地经历',
      '工作及实习经历，含 AI 训练师全职履历',
      '教育背景、技能总结与个人简介',
    ],
    linkLabel: '查看简历模块',
    href: './resume.html',
  },
  {
    number: '',
    id: 'f1-overview',
    title: '个人爱好',
    icon: cardIcon01,
    desc: 'F1 2026 赛季实时积分数据，含 22 位车手排名、11 支车队走势与完整阵容介绍。',
    items: [
      '2026 赛季车手积分榜，实时数据来自 Jolpica F1 API',
      '11 支车队积分排名，持续追踪赛季走势',
      '22 位车手完整阵容介绍与车队归属',
    ],
    linkLabel: '查看个人爱好',
    href: './f1.html',
  },
];

const socialLinks = [
  {
    name: '微信',
    label: 'WeChat',
    href: '#wechat',
    iconColor: '#07C160',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 3.35c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm5.4 0c.535 0 .969.44.969.982a.976.976 0 0 1-.97.983.976.976 0 0 1-.968-.983c0-.542.433-.982.969-.982z" />
      </svg>
    ),
    description: '微信扫码添加',
  },
  {
    name: '抖音',
    label: 'Douyin',
    href: 'https://www.douyin.com/user/self',
    iconColor: '#E1E0CC',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
      </svg>
    ),
    description: '短视频 / 创作内容',
  },
  {
    name: '小红书',
    label: 'Xiaohongshu',
    href: 'https://www.xiaohongshu.com/user/profile/62cbce4c0000000002000063',
    iconColor: '#FF2442',
    icon: (
      <img
        className="h-8 w-8 rounded-full object-cover"
        src="https://www.xiaohongshu.com/favicon.ico"
        alt="小红书"
      />
    ),
    description: '图文笔记 / 生活分享',
  },
  {
    name: '哔哩哔哩',
    label: 'Bilibili',
    href: 'https://space.bilibili.com/262446332?spm_id_from=333.1007.0.0',
    iconColor: '#00A1D6',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.263 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.263-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1 0-1.733 1.234 1.234 0 0 1 1.733 0L7.88 4.316h8.32l1.214-1.213a1.234 1.234 0 0 1 1.733 0 1.234 1.234 0 0 1 0 1.733l-1.334 1.817zm.146 3.566H5.707c-.51 0-.979.199-1.337.557A1.886 1.886 0 0 0 3.813 10.1v6.666c0 .51.199.979.557 1.337.357.357.826.556 1.337.556h12.252c.51 0 .979-.199 1.337-.556.358-.358.557-.827.557-1.337V10.1a1.886 1.886 0 0 0-.557-1.337 1.886 1.886 0 0 0-1.337-.557zm-8.586 2.919c.551 0 .998.447.998.998v2.625a.998.998 0 0 1-1.996 0V12.136c0-.551.447-.998.998-.998zm5.52 0c.551 0 .998.447.998.998v2.625a.998.998 0 0 1-1.996 0V12.136c0-.551.447-.998.998-.998z" />
      </svg>
    ),
    description: '视频内容 / UP 主主页',
  },
];

function FeatureCard({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TextCard({
  title,
  desc,
  id,
  linkLabel,
  href,
  videoSrc,
}: (typeof features)[number] & { videoSrc?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    const tryPlay = () => { v.play().catch(() => {}); };
    v.addEventListener('canplay', tryPlay, { once: true });
    v.load();
    tryPlay();
    const events = ['touchstart', 'touchend', 'click'] as const;
    events.forEach(e => window.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, tryPlay));
  }, []);

  const scrollToTarget = () => {
    if (!href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash !== href) {
      window.history.replaceState(null, '', href);
    }
  };

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    scrollToTarget();
  };

  return (
    <a
      id={id}
      href={href}
      onClick={handleCardClick}
      className="group relative flex h-full min-h-[320px] cursor-pointer overflow-hidden rounded-[1.75rem] bg-[#212121] no-underline"
    >
      {videoSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-xs uppercase tracking-[0.22em] text-primary/70">{title}</p>
        <p className="mt-2 text-xl text-[#E1E0CC] sm:text-2xl">{desc}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary/60 transition-all duration-200 group-hover:gap-2.5 group-hover:text-primary/90">
          {linkLabel}
          <ArrowRight className="h-3 w-3 -rotate-45" />
        </span>
      </div>
    </a>
  );
}

export default function App() {
  const [wechatOpen, setWechatOpen] = useState(false);
  const aboutRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const featureVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadAndPlay = (v: HTMLVideoElement) => {
      v.muted = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      const tryPlay = () => { v.play().catch(() => {}); };
      v.addEventListener('canplay', tryPlay, { once: true });
      v.load();
      tryPlay();
    };

    // Hero video: load immediately (above the fold)
    const hv = heroVideoRef.current;
    if (hv) loadAndPlay(hv);

    // Feature video: lazy-load when card scrolls into view
    const fv = featureVideoRef.current;
    if (fv) {
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadAndPlay(fv);
          obs.disconnect();
        }
      }, { rootMargin: '300px' });
      obs.observe(fv);
    }

    const onInteraction = () => {
      document.querySelectorAll('video').forEach(v => (v as HTMLVideoElement).play().catch(() => {}));
    };
    ['touchstart', 'touchend', 'click', 'scroll'].forEach(e =>
      window.addEventListener(e, onInteraction, { once: true, passive: true })
    );
    return () => {
      ['touchstart', 'touchend', 'click', 'scroll'].forEach(e =>
        window.removeEventListener(e, onInteraction)
      );
    };
  }, []);
  const { scrollYProgress } = useScroll({ target: aboutRef, offset: ['start 0.8', 'end 0.2'] });
  const aboutText = useMemo(
    () =>
      '我是一名 AI 训练师，专注于大模型微调、SFT 数据构建与 RAG 知识库落地。这里汇聚了我的完整简历、精选全球 AI 工具与产品榜，以及 F1 2026 赛季实时积分数据，是我持续沉淀内容与记录热爱的个人空间。'.split(
        '',
      ),
    [],
  );

  return (
    <main className="bg-black text-[#E1E0CC]">
      <section id="home" className="h-screen bg-black p-4 md:p-6">
        <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-black to-neutral-800 md:rounded-[2rem]">
          <video
            ref={heroVideoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            // @ts-ignore
            fetchpriority="high"
            src={heroVideo}
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[10px] transition-colors sm:text-xs md:text-sm"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#E1E0CC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-8">
                <WordsPullUp
                  text="Starry"
                  showAsterisk
                  className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
                />
              </div>
              <div className="md:col-span-4 md:pb-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.5, ease }}
                  className="max-w-sm text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base"
                >
                  AI 训练师个人网站。收录完整简历、精选 AI 工具与产品榜，以及 F1 2026 赛季实时数据。
                </motion.p>
                <motion.a
                  href="#snake-game-entry"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: 0.7, ease }}
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                >
                  <span>轻松一下</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[#E1E0CC]" />
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        ref={aboutRef}
        className="bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28"
      >
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#101010] px-6 py-14 text-center sm:px-10 md:px-14 md:py-20">
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">
            AI TRAINER
          </p>
          <WordsPullUpMultiStyle
            className="mx-auto mt-8 max-w-3xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
            segments={[
              { text: '我是 Starry，', className: 'font-normal' },
              { text: '一名 AI 训练师。', className: 'font-serif italic font-normal' },
              {
                text: '这里记录我的工作履历、精选 AI 内容，与 F1 赛事热情。',
                className: 'font-normal',
              },
            ]}
          />
          <div className="mx-auto mt-10 max-w-3xl text-left text-xs leading-7 text-[#DEDBC8] sm:text-sm md:text-base">
            {aboutText.map((char, index) => (
              <AnimatedLetter
                key={`${char}-${index}`}
                char={char}
                index={index}
                total={aboutText.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mt-12 grid gap-3 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-3">
            {/* 01 个人简历 */}
            <FeatureCard index={0} className="lg:col-span-1">
              <TextCard {...features[0]} videoSrc={resumeVideo} />
            </FeatureCard>

            {/* 02 AI推荐 */}
            <FeatureCard index={1} className="lg:col-span-1">
              <a
                href="./portfolio.html"
                id="portfolio-overview"
                className="group relative flex h-full min-h-[320px] overflow-hidden rounded-[1.75rem] bg-[#212121] no-underline"
              >
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  ref={featureVideoRef}
                  loop
                  muted
                  playsInline
                  preload="none"
                  src={featureVideo}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-primary/70">AI推荐</p>
                  <p className="mt-2 text-xl text-[#E1E0CC] sm:text-2xl">
                    精选 40+ AI 工具、全球产品榜与博主推荐，覆盖对话、绘图、视频、编程等多个场景。
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary/60 transition-all duration-200 group-hover:gap-2.5 group-hover:text-primary/90">
                    查看 AI 推荐
                    <ArrowRight className="h-3 w-3 -rotate-45" />
                  </span>
                </div>
              </a>
            </FeatureCard>

            {/* 03 个人爱好 */}
            <FeatureCard index={2} className="lg:col-span-1">
              <TextCard {...features[1]} videoSrc={hobbiesVideo} />
            </FeatureCard>
          </div>
        </div>
      </section>

<section id="contact" className="bg-black px-4 py-20 sm:px-6 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">
            CONTACT
          </p>
          <WordsPullUpMultiStyle
            className="mt-6 max-w-2xl text-3xl font-normal leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.92] md:text-5xl lg:text-6xl"
            segments={[
              { text: '联系我，', className: 'text-[#E1E0CC]' },
              { text: '在各平台找到我。', className: 'text-gray-500' },
            ]}
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {socialLinks.map((link, index) => (
              <FeatureCard key={link.name} index={index}>
                <a
                  href={link.href}
                  target={link.href.startsWith('#') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={
                    link.name === '微信'
                      ? (e) => { e.preventDefault(); setWechatOpen(true); }
                      : link.href.startsWith('#')
                      ? (e) => e.preventDefault()
                      : undefined
                  }
                  className="flex h-full min-h-[240px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[1.75rem] bg-[#212121] p-8 text-center no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-[#282828]"
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
                    style={{ color: link.iconColor }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#E1E0CC]">{link.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{link.label}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">{link.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-[#E1E0CC]/60 transition-all duration-200 hover:text-[#E1E0CC]/90">
                    {link.href.startsWith('#') ? '扫码联系' : `前往 ${link.name}`}
                    <ArrowRight className="h-3 w-3 -rotate-45" />
                  </span>
                </a>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-black px-4 py-10 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#E1E0CC]/40 sm:text-xs">
              STARRY
            </p>
            <p className="mt-1 text-xs text-white/20">AI Trainer · Personal Website</p>
          </div>
          <p className="text-xs text-white/20">© 2026 Starry · All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {wechatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setWechatOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-[#1a1a1a] p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setWechatOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#E1E0CC] transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mb-4 text-center text-sm text-gray-400">扫描二维码添加微信</p>
              <img
                src="/wechat-qr.png"
                alt="微信二维码"
                className="h-56 w-56 rounded-2xl object-contain"
              />
              <p className="mt-4 text-center text-xs text-gray-500">微信扫一扫</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

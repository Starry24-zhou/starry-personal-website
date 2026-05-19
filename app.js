// 1. 初始化 Lenis 平滑滚动
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 有弹性的顺滑缓动
    smooth: true,
    smoothTouch: false // 移动端保留原生手感
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- i18n 国际化逻辑 ---
const messages = {
    en: {
        langBtn: "EN / 中",
        navHome: "HOME",
        navPortfolio: "AI PORTFOLIO",
        navF1: "F1 HOBBIES",
        navRender: "RENDER GALLERY",
        navResume: "RESUME",
        heroTitleLine1: "HELLO, I'M",
        heroTitleLine2: "AN",
        heroTitleHighlight: "AI TRAINER",
        heroDesc: "Bridging the gap between human intent and machine intelligence. A geek developer specializing in LLM fine-tuning, Agent workflows, and Prompt Engineering.",
        portfolioTitle: "AI.<span class='text-accent'>PORTFOLIO</span>",
        portfolioLine1: "LOADING AI WORK COLLECTION...",
        portfolioLine2: "MODULE: LLM FINE-TUNING CASES",
        portfolioLine3: "MODULE: AGENT WORKFLOW SOLUTIONS",
        portfolioLine4: "MODULE: PROMPT DESIGN EXPERIMENTS",
        portfolioLine5: "STATUS: READY FOR REVIEW",
        f1Title: "F1.<span class='text-accent'>HOBBIES</span>",
        f1Card1Title: "Race Weekend Notes",
        f1Card1Desc: "Record race strategy shifts, tyre choices, and driver performance for each F1 weekend.",
        f1Card2Title: "Circuit Analysis",
        f1Card2Desc: "Analyze corner profiles and speed traces from tracks like Silverstone, Suzuka, and Monaco.",
        f1Card3Title: "Driver Tracker",
        f1Card3Desc: "Track driver points, qualifying consistency, and race pace throughout the season.",
        f1Card4Title: "Team Strategy Archive",
        f1Card4Desc: "Archive team decisions on pit windows, safety-car phases, and long-run strategy patterns.",
        renderTitle: "RENDER.GALLERY",
        resumeTitle: "PERSONAL.<span class='text-accent'>RESUME</span>",
        resumeDesc: "AI Trainer / Prompt Engineer. Feel free to download my resume or contact me for collaboration.",
        resumeBtn: "VIEW RESUME_"
    },
    zh: {
        langBtn: "中 / EN",
        navHome: "首页 / HOME",
        navPortfolio: "AI作品集 / AI PORTFOLIO",
        navF1: "个人爱好(F1) / F1 HOBBIES",
        navRender: "渲染集 / RENDER GALLERY",
        navResume: "个人简历 / RESUME",
        heroTitleLine1: "你好，我是",
        heroTitleLine2: "一名",
        heroTitleHighlight: "AI 训练师",
        heroDesc: "在人类意图与机器智能之间搭建桥梁。专注大模型微调、Agent 工作流构建与 Prompt 工程的极客开发者。",
        portfolioTitle: "AI.<span class='text-accent'>作品集</span>",
        portfolioLine1: "正在载入 AI 项目合集...",
        portfolioLine2: "模块：大模型微调案例",
        portfolioLine3: "模块：Agent 工作流解决方案",
        portfolioLine4: "模块：Prompt 设计实验",
        portfolioLine5: "状态：可开始审阅",
        f1Title: "个人爱好.<span class='text-accent'>F1</span>",
        f1Card1Title: "比赛周末笔记",
        f1Card1Desc: "记录每一站 F1 比赛的策略变化、轮胎选择与车手表现，形成个人观赛数据库。",
        f1Card2Title: "赛道分析",
        f1Card2Desc: "对银石、铃鹿、摩纳哥等赛道进行弯角拆解和速度曲线分析。",
        f1Card3Title: "车手追踪",
        f1Card3Desc: "持续追踪车手赛季积分、排位稳定性与比赛节奏。",
        f1Card4Title: "车队策略档案",
        f1Card4Desc: "整理各车队在进站窗口、安全车阶段与长距离策略中的决策模式。",
        renderTitle: "渲染集",
        resumeTitle: "个人.<span class='text-accent'>简历</span>",
        resumeDesc: "AI训练师 / Prompt工程师，欢迎下载简历或联系合作。",
        resumeBtn: "查看简历_"
    }
};

let currentLang = 'zh';
const langToggleBtn = document.getElementById('langToggle');

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (messages[lang][key]) {
            el.innerHTML = messages[lang][key];
        }
    });
    // 更新 HTML 标签的 lang 属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateLanguage(currentLang);
    
    // 切换语言后，如果需要可以重新计算 GSAP 的 ScrollTrigger，防止布局变化导致触发点不准
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

// --- 全屏菜单逻辑 ---
const menuToggleBtn = document.getElementById('menuToggle');
const fullMenu = document.getElementById('fullMenu');
const menuLinks = document.querySelectorAll('.menu-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        fullMenu.classList.add('active');
        menuToggleBtn.classList.add('menu-open');
        lenis.stop(); // 停止 Lenis 滚动
        document.body.style.overflow = 'hidden'; // 防止原生滚动
    } else {
        fullMenu.classList.remove('active');
        menuToggleBtn.classList.remove('menu-open');
        lenis.start(); // 恢复 Lenis 滚动
        document.body.style.overflow = '';
    }
}

menuToggleBtn.addEventListener('click', toggleMenu);

// 点击菜单链接时关闭菜单
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// 开场动效：参考 Landon Norris 的首屏氛围，替换为个人IP形象
const openingScene = document.getElementById('openingScene');
const openingIp = document.getElementById('ipCharacter');

// 这里可替换成你的真实Q版IP图 URL
const IP_CHARACTER_SRC = openingIp?.getAttribute('src') || '';
if (openingIp && IP_CHARACTER_SRC) {
    openingIp.src = IP_CHARACTER_SRC;
}

function runOpeningScene() {
    if (!openingScene) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        openingScene.style.display = 'none';
        return;
    }

    const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
            openingScene.style.display = 'none';
            ScrollTrigger.refresh();
        }
    });

    tl.fromTo('.opening-ip', { scale: 0.72, opacity: 0, y: 80 }, { scale: 1, opacity: 1, y: 0, duration: 1.1 })
      .fromTo('.opening-slogan', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.5')
      .fromTo('.shard-left', { x: -160, y: 90, opacity: 0, rotate: -42 }, { x: 0, y: 0, opacity: 0.9, rotate: -18, duration: 0.85 }, '-=0.6')
      .fromTo('.shard-right', { x: 150, y: 90, opacity: 0, rotate: 40 }, { x: 0, y: 0, opacity: 0.9, rotate: 17, duration: 0.85 }, '-=0.82')
      .to('.opening-ip', { scale: 1.06, duration: 0.4, ease: 'power2.inOut' }, '+=0.25')
      .to('.opening-shard', { x: (i) => (i === 0 ? -220 : 220), y: -40, opacity: 0, duration: 0.45 }, '-=0.22')
      .to('.opening-center', { scale: 0.92, opacity: 0, y: -30, duration: 0.55 }, '-=0.32')
      .to('.opening-scene', { opacity: 0, duration: 0.38, ease: 'power2.in' }, '-=0.2');
}

runOpeningScene();

// 2. 背景拓扑纹理轻微视差滚动 (L3 级特效)
gsap.to(".topo-bg", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // 增加一点平滑延迟
    }
});

// 3. Hero 首屏文字 Mask Reveal 入场动效
const heroTl = gsap.timeline();

// 等待字体加载或页面渲染一小会儿再播放
setTimeout(() => {
    heroTl.to(".reveal-text span", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
    })
    .to(".hero-desc", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8")
    .to(".hero-image", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".navbar", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all"
    }, "-=1");
}, 100);

// 4. 全局通用滚动触发 Reveal Up 动画
gsap.utils.toArray('.reveal-up:not(.hero-desc):not(.hero-image)').forEach(elem => {
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 85%", // 当元素顶部到达视口 85% 时触发
            toggleActions: "play none none reverse" // 向下滚动播放，向上滚动反转（增加交互感）
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// 5. Bento Box 卡片 Spotlight 聚光灯跟随效果
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // 确保非移动端环境才触发
        if(window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            // 计算鼠标相对卡片左上角的坐标
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 写入 CSS 变量，供 radial-gradient 使用
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});


// ========== 贪吃蛇游戏入口 - START ==========
// 此段代码在 AI作品集板块自动插入游戏入口卡片
// 如需移除，删除从此处到 "贪吃蛇游戏入口 - END" 的所有代码即可
(function addSnakeGameCard() {
    function tryInsert() {
        var titleEl = document.querySelector('[data-i18n="portfolioTitle"]');
        if (!titleEl) return false;
        var section = titleEl.closest('section');
        if (!section) return false;
        if (document.getElementById('snake-game-entry')) return true;

        var entry = document.createElement('div');
        entry.id = 'snake-game-entry';
        entry.className = 'snake-game-entry reveal-up';
        entry.innerHTML =
            '<a href="snake.html" class="snake-game-link">' +
                '<div class="snake-game-preview">' +
                    '<span class="badge">CANVAS GAME</span>' +
                    '<div class="snake-game-visual"></div>' +
                '</div>' +
                '<div class="snake-game-info">' +
                    '<h3>深海贪吃蛇</h3>' +
                    '<p>纯 Canvas 实现 · 丝滑移动 · 进化系统 · 程序化音效 · 连击 Combo</p>' +
                    '<span class="snake-game-cta">PLAY GAME_</span>' +
                '</div>' +
            '</a>';
        section.appendChild(entry);

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.to(entry, {
                scrollTrigger: {
                    trigger: entry,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
        return true;
    }

    if (!tryInsert()) {
        var observer = new MutationObserver(function (mutations, obs) {
            if (tryInsert()) obs.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(function () { observer.disconnect(); }, 15000);
    }
})();
// ========== 贪吃蛇游戏入口 - END ==========

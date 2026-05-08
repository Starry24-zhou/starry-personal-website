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
        navAbout: "SYSTEM.PROMPT",
        navProjects: "TRAINING.LOGS",
        navHobbies: "OFFLINE.STATE",
        navContact: "INITIATE.HANDSHAKE",
        heroTitleLine1: "HELLO, I'M",
        heroTitleLine2: "AN",
        heroTitleHighlight: "AI TRAINER",
        heroDesc: "Bridging the gap between human intent and machine intelligence. A geek developer specializing in LLM fine-tuning, Agent workflows, and Prompt Engineering.",
        aboutTitle: "SYSTEM.<span class='text-accent'>PROMPT</span>",
        aboutLine1: "INITIALIZING PROFILE...",
        aboutLine2: "ROLE: AI TRAINER & PROMPT ENGINEER",
        aboutLine3: "EXPERTISE: LLM FINE-TUNING, RAG ARCHITECTURE, WORKFLOW AUTOMATION.",
        aboutLine4: "MISSION: TEACHING MACHINES TO REASON, CREATE, AND UNDERSTAND.",
        aboutLine5: "STATUS: READY FOR NEW CHALLENGES",
        projectsTitle: "TRAINING.<span class='text-accent'>LOGS</span>",
        project1Title: "Project Alpha: Support AI",
        project1Desc: "Domain-specific model trained on Llama-3, achieving 95% intent recognition accuracy and processing over 100k customer support tickets.",
        project2Title: "Auto-Coder",
        project2Desc: "Multi-agent collaborative system generating frontend and backend boilerplate code directly from PRD parsing.",
        project3Title: "Creative Writer",
        project3Desc: "Designed complex Prompt Chains to guide models in generating high-quality, logically consistent sci-fi novel chapters.",
        project4Title: "Enterprise Knowledge Base",
        project4Desc: "Deployed a RAG system for 10,000+ internal documents, reducing information retrieval and synthesis time by 80%.",
        hobbiesTitle: "OFFLINE.STATE",
        footerTitle: "INITIATE.<span class='text-accent'>HANDSHAKE</span>",
        footerDesc: "Looking for an AI Trainer to elevate your intelligent systems?",
        footerBtn: "PING ME_"
    },
    zh: {
        langBtn: "中 / EN",
        navHome: "首页 / HOME",
        navAbout: "系统设定 / SYSTEM.PROMPT",
        navProjects: "训练日志 / TRAINING.LOGS",
        navHobbies: "离线状态 / OFFLINE.STATE",
        navContact: "建立连接 / INITIATE.HANDSHAKE",
        heroTitleLine1: "你好，我是",
        heroTitleLine2: "一名",
        heroTitleHighlight: "AI 训练师",
        heroDesc: "在人类意图与机器智能之间搭建桥梁。专注大模型微调、Agent 工作流构建与 Prompt 工程的极客开发者。",
        aboutTitle: "系统.<span class='text-accent'>设定</span>",
        aboutLine1: "正在初始化配置文件...",
        aboutLine2: "角色：AI 训练师 & 提示词工程师",
        aboutLine3: "专长：大语言模型微调，RAG 架构，工作流自动化。",
        aboutLine4: "使命：教会机器推理、创造与理解。",
        aboutLine5: "状态：已准备好迎接新挑战",
        projectsTitle: "训练.<span class='text-accent'>日志</span>",
        project1Title: "Alpha 计划：智能客服",
        project1Desc: "基于 Llama-3 训练的领域专精模型，拥有 95% 的意图识别准确率，处理了超过 10 万条客服工单记录。",
        project2Title: "自动编码器",
        project2Desc: "构建的多智能体协作系统，实现从 PRD 解析到前后端样板代码的自动生成。",
        project3Title: "创意作家",
        project3Desc: "设计了复杂的 Prompt Chain，引导模型生成高质量、符合逻辑的科幻小说章节。",
        project4Title: "企业知识库",
        project4Desc: "为 10,000+ 份企业内部文档部署检索增强生成（RAG）系统，将信息检索与整合时间降低了 80%。",
        hobbiesTitle: "离线状态",
        footerTitle: "建立.<span class='text-accent'>连接</span>",
        footerDesc: "正在寻找 AI 训练师来提升您的智能系统吗？",
        footerBtn: "联系我_"
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

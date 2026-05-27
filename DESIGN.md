# DESIGN.md

> 极客精神与数字前卫的完美碰撞，硬核且不失张力。

## 1. Visual Theme & Atmosphere

**Style**: Tech-Avant-Garde (科技先锋风格)
**Keywords**: 硬核 / 前卫 / 高对比 / 拓扑纹理 / 荧光点缀 / 极客感
**Tone**: 自信、专业、充满能量 — NOT 沉闷、传统、过度修饰
**Feel**: 像是在阅读一份来自未来的 AI 核心机密档案。

**Interaction Tier**: L3 沉浸体验 (Immersive Experience)
**Dependencies**: CSS + GSAP + ScrollTrigger + Lenis (平滑滚动)

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #FFFFFF;                          /* 页面主背景，纯白以凸显对比度 */
  --surface: #F4F4F5;                     /* 次级背景/卡片，浅灰 */
  --surface-alt: #111111;                 /* 反色区块背景，用于产生强烈视觉冲击 */
  --surface-hover: #E5E5E5;               /* 悬停态表面 */

  /* Borders */
  --border: #E5E5E5;                      /* 默认边框，浅色 */
  --border-dark: #333333;                 /* 深色区块边框 */
  --border-hover: #000000;                /* 悬停边框，强烈对比 */

  /* Text */
  --text: #0A0A0A;                        /* 标题、重要文字，极深灰近黑 */
  --text-secondary: #555555;              /* 正文、描述，中灰 */
  --text-tertiary: #888888;               /* 标签、辅助信息，浅灰 */
  --text-inverse: #FFFFFF;                /* 反色文字，用于深色背景 */

  /* Accent */
  --accent: #DFFF00;                      /* 主强调色，荧光黄/绿 (Lando Norris 同款) */
  --accent-hover: #CBE600;                /* 强调色悬停，稍微加深 */
  
  /* RGB variants for rgba() */
  --bg-rgb: 255, 255, 255;
  --text-rgb: 10, 10, 10;
  --accent-rgb: 223, 255, 0;

  /* Semantic */
  --success: #00E676;
  --error: #FF3B30;
  --warning: #FFAB00;
}
```

**Color Rules:**
- 所有颜色必须通过 CSS 变量引用，禁止在组件样式中硬编码 hex 值。
- 荧光黄 (`--accent`) 仅用于关键的 Call-to-Action (CTA)、核心数据强调或 Hover 状态的点缀，不可大面积作为背景使用以免视觉疲劳。
- 页面背景需叠加一层非常微弱的“拓扑等高线 (Topographic contour)” SVG 纹理，透明度控制在 5% 以内。

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap');

:root {
  --font-heading: 'Oswald', 'Noto Sans SC', sans-serif;
  --font-body: 'Inter', 'Noto Sans SC', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | `--font-heading` | 6rem/8vw | 700 (Bold) | 1.0 | -0.02em |
| Section H2 | `--font-heading` | 3rem/4vw | 700 (Bold) | 1.1 | -0.01em |
| H3 / Card Title | `--font-heading` | 1.5rem | 500 (Medium) | 1.2 | 0 |
| Body | `--font-body` | 1rem | 400 (Regular) | 1.6 | 0 |
| Label / Tag | `--font-body` | 0.875rem | 600 (SemiBold)| 1.4 | 0.05em |
| Mono/Code | `--font-mono` | 0.875rem | 400 (Regular) | 1.5 | 0 |

**Typography Rules:**
- 标题 (H1/H2) 必须全大写 (英文字母)，中文保持原样，排版要紧凑，字间距可微调为负值以增加力量感。
- **NEVER use**: 任何系统默认的衬线字体 (如 Times New Roman, 宋体)，避免减弱现代科技感。

**Text Decoration:**
- Hero H1: 无渐变、无投影。使用纯实色 (`--text`) 或在特定深色区块使用反色 (`--text-inverse`)。可通过 CSS Mask 实现滚动时的文字揭示动画。

## 4. Component Stylings

### Buttons
```css
.btn-primary {
  background-color: var(--accent);
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--text);
  border-radius: 4px; /* 极小圆角，偏硬朗 */
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px var(--text); /* 新粗野主义风格的硬阴影 */
  background-color: var(--accent-hover);
}

.btn-primary:active {
  transform: translate(0, 0);
  box-shadow: 0px 0px 0px var(--text);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 4px;
}

.btn-primary:disabled {
  background-color: var(--surface-hover);
  color: var(--text-tertiary);
  border-color: var(--border);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

### Cards (项目/爱好展示)
```css
.card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  border-color: var(--text);
  transform: translateY(-4px);
}

.card:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(223, 255, 0, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1; /* 聚光灯跟随效果 */
}
```

### Tags / Badges
```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--text);
  color: var(--text-inverse);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge.badge-outline {
  background-color: transparent;
  color: var(--text);
  border: 1px solid var(--text);
}
```

## 5. Layout Principles

**Container:**
- Max width: 1440px
- Padding: 2rem (Desktop), 1rem (Mobile)
- Narrow variant (text-heavy): 800px

**Spacing Scale:**
- Section padding: 8rem 0 (Desktop) / 4rem 0 (Mobile)
- Component gap: 2rem
- Card internal padding: 1.5rem

**Grid:**
```css
.grid-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
/* 具体卡片按需跨越网格，如跨越 4 列或 8 列，形成不对称的 Bento Box 布局 */
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 无阴影，仅用 1px 边框分隔 | 默认卡片、容器 |
| Hard Shadow | `box-shadow: 4px 4px 0px var(--text)` | 按钮 Hover、强调浮窗 |
| Soft Glow | `box-shadow: 0 0 20px rgba(223, 255, 0, 0.2)` | 极少数核心 AI 元素的常驻高光 |

## 7. Animation & Interaction

**Motion Philosophy**: 丝滑、有力量感，拒绝软绵绵的慢缓动，采用带有一定弹性的曲线。
**Tier**: L3 (沉浸体验)

### Dependencies
```html
<script src="https://unpkg.com/@studio-freight/lenis@1.0.39/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Base Setup
```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### Entrance Animation
```css
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
}
/* GSAP 将接管此类名元素的入场 */
```

### Scroll Behavior
- **Hero 文字遮罩揭示**: 页面加载时，大标题从下往上被遮罩切出（Clip-path reveal）。
- **视差背景**: 背景的拓扑纹理以不同于内容的速率缓慢滚动。
- **Section Pin**: 在展示“AI 作品”时，左侧固定标题，右侧卡片内容向上滑动（左 Pin 右 Swap）。

### Hover & Focus States
- 所有的可点击元素（卡片、图片）必须有极快的 Scale 反馈（如 `scale: 0.98`），模拟物理按压。

### Special Effects
- **Spotlight Card**: 卡片悬停时，鼠标位置产生微弱的荧光黄渐变高光，跟随鼠标移动（使用 `--mouse-x` 和 `--mouse-y` CSS 变量更新）。

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal-up {
    opacity: 1;
    transform: none;
  }
}
```

## 8. Do's and Don'ts

### Do
- 保持极高的文字对比度，重要信息一目了然。
- 使用不对称的网格（Bento 布局）来打破死板的对齐。
- 在页面底部或重要转折处，使用大面积的黑色背景块形成视觉冲击。
- 确保所有的交互（Hover, Click）都有明确、即时的视觉反馈。
- 使用 SVG 绘制背景拓扑纹理以确保高清且不影响性能。

### Don't
- ❌ 绝对不要使用默认的蓝色链接。
- ❌ 不要使用带有模糊的大面积 `backdrop-filter`，影响性能。
- ❌ 不要把荧光黄用作大段文字的颜色，会导致无法阅读。
- ❌ 避免使用过于圆润的边角（不要超过 8px），保持硬朗感。
- ❌ 不要使用自带阴影的拟物化图标，使用极简线条图标（如 Lucide）。
- ❌ 禁用原生系统滚动条外观，应自定义或隐藏。
- ❌ 避免超过 3 层深度的 DOM 嵌套动画，防止掉帧。
- ❌ 绝对不要在没有 IntersectionObserver 的情况下运行常驻动画。

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 完整 Bento 网格，保留全部视差和跟随动效 |
| Tablet | 768px - 1024px| 网格减少为 2 列，字体适当缩小 |
| Mobile | < 768px | 网格变为单列，关闭复杂的光标跟随动效，减小 Section padding |

**Touch Targets:** minimum 44x44px (所有按钮和链接区域必须符合此标准)
**Collapsing Strategy:** 移动端下，多栏卡片平铺为单栏流式布局，隐藏装饰性的拓扑线条以免画面杂乱。

```css
@media (max-width: 768px) {
  .grid-bento {
    grid-template-columns: 1fr;
  }
  
  :root {
    --font-size-h1: 4rem;
  }
  
  .card::before {
    display: none; /* 移动端关闭高光跟随 */
  }
}
```

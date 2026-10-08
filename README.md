<div align="center">

# 🇩🇪 DeutschMeister

### Comprehensive German Language Learning & Testing Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**CEFR Levels: A1 · A2 · B1 · B2** | **Languages: English 🇬🇧 · Bengali 🇧🇩**

[Live Demo](#) · [Report Bug](issues) · [Request Feature](issues)

</div>

---

## 📸 Overview

DeutschMeister is a full-featured German language learning and testing platform inspired by **IELTS preparation sites**, **Quizlet**, and **DW Learn German**. It follows the **Learn → Test → Analyze → Re-learn** cycle to help learners prepare for **Goethe-Zertifikat** and **telc** exams at CEFR levels A1 through B2.

The platform supports **English** and **Bengali** as instruction languages, making it uniquely accessible for Bangladeshi and South Asian learners.

---

## ✨ Features

### 🎯 Core Modules
| Module | Description |
|--------|-------------|
| **Dashboard** | Progress overview, skill radar/bar charts, streak tracker, targeted recommendations |
| **Learning Zone** | Structured A1–B2 lessons with lock/unlock progression system |
| **Mock Test Hub** | Goethe-Zertifikat & telc format exam simulators for all 4 levels |
| **Flashcards** | Spaced-repetition style flip cards with Known / Review Again actions |
| **My Progress** | Trend line charts, radar analysis, full test history table |

### 📝 Exam Simulator (4 Sections)
- **📖 Lesen (Reading)** — Split-screen: passage on left, MCQ + True/False questions on right
- **🎧 Hören (Listening)** — Custom audio player with **maximum 2-play rule** matching real exam conditions
- **✍️ Schreiben (Writing)** — Distraction-free textarea with live word count bar
- **🎤 Sprechen (Speaking)** — Recording UI with sound wave animation and re-record option

### ⏱️ Exam Features
- **Global countdown timer** — turns red and pulses when under 5 minutes
- **Question palette** — jump between questions, see answered/unanswered status
- **Submit confirmation modal** — prevents accidental submission

### 📊 Post-Test Analysis ("Jumpito" Model)
- **Score ring** — animated SVG circle with color-coded pass/fail
- **Per-question breakdown** — see your answer vs. correct answer for every question
- **Targeted recommendation cards** — suggests specific A1/A2 lessons based on mistakes
- **Urgency system** — High / Medium / Low priority recommendations

### 🌐 Multilingual Support
- **English / Bengali toggle** in the navbar
- 100+ translation strings covering all UI elements
- Instant switch — no page reload required

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js (App Router)** | 15.3.3 | Framework, routing, SSR/SSG |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4 | Styling, responsive design |
| **Lucide React** | 0.469 | Icons |
| **Recharts** | 2.15 | Radar, bar, and line charts |
| **clsx** | 2.1 | Conditional class names |

---

## 📁 Project Structure

```
german-platform/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with context providers
│   │   ├── page.tsx            # Main SPA router / view switcher
│   │   └── globals.css         # Tailwind base + custom component classes
│   │
│   ├── components/
│   │   ├── Navbar.tsx          # Top bar: EN/BN toggle, search, notifications
│   │   ├── Sidebar.tsx         # Navigation + level progress bars + daily goal
│   │   ├── Dashboard.tsx       # Stats cards, radar/bar charts, recommendations
│   │   ├── ExamSimulator.tsx   # Full 4-section exam with timer
│   │   ├── ResultsPage.tsx     # Score ring, answer breakdown, study recs
│   │   ├── LearningZone.tsx    # Expandable A1–B2 lesson accordion
│   │   ├── MockTestHub.tsx     # Test selection cards for all 4 levels
│   │   ├── Flashcards.tsx      # Flip card deck with spaced repetition UI
│   │   └── ProgressView.tsx    # Trend charts + full test history table
│   │
│   ├── context/
│   │   ├── LanguageContext.tsx # EN/BN i18n with 100+ translation strings
│   │   └── AppContext.tsx      # Global state: active view, exam data, results
│   │
│   └── data/
│       └── dummyData.ts        # Question banks, flashcards, lesson modules, dummy stats
│
├── public/                     # Static assets
├── .gitignore
├── next.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vercel.json                 # Vercel deployment config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/german-platform.git

# 2. Navigate to the project folder
cd german-platform

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## ☁️ Deploy to Vercel

The easiest way to deploy is directly via Vercel:

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration (Recommended)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Click **Deploy** — Vercel auto-detects Next.js settings

The `vercel.json` is already configured. No extra setup needed.

---

## 🎮 User Guide

### Navigation Flow
```
Dashboard → Learning Zone → Mock Test Hub → Exam → Results → (Re-learn)
```

### Quick Start — Take a Mock Test
1. Click **"Start A1 Mock Test"** on the Dashboard
2. Switch between **Lesen / Hören / Schreiben / Sprechen** tabs
3. Answer questions (MCQ or True/False)
4. In **Hören**: note the 2-play maximum on the audio player
5. Click **Submit Test** → see your score ring and per-question breakdown
6. Review the **Targeted Recommendations** to know what to study next

### Language Switching
Click **EN** or **বাং** in the top-right of the navbar to switch the entire interface.

---

## 📋 CEFR Level Coverage

| Level | Description | Lessons | Exam Format |
|-------|-------------|---------|-------------|
| **A1** | Beginner | 5 lessons | Goethe-Zertifikat A1 |
| **A2** | Elementary | 4 lessons | Goethe-Zertifikat A2 |
| **B1** | Intermediate | 3 lessons | Goethe-Zertifikat B1 / telc B1 |
| **B2** | Upper Intermediate | 3 lessons | Goethe-Zertifikat B2 |

---

## 🗺️ Roadmap

- [ ] Backend API with user authentication (NextAuth.js)
- [ ] Real audio files for Hören sections
- [ ] AI-powered Schreiben grading (Gemini API)
- [ ] AI speech evaluation for Sprechen section
- [ ] Spaced repetition algorithm (SM-2) for flashcards
- [ ] Leaderboard and social features
- [ ] Progressive Web App (PWA) support
- [ ] More question banks (B1, B2 full sets)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — The React Framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Recharts](https://recharts.org/) — Composable charting library
- [Lucide Icons](https://lucide.dev/) — Beautiful open-source icons
- [Goethe-Institut](https://www.goethe.de/) — German language certification authority
- [DW Learn German](https://learngerman.dw.com/) — Inspiration for content structure

---

<div align="center">
Made with ❤️ for German learners worldwide 🇩🇪
</div>

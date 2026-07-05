<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
</div>

<h1 align="center">🚀 sibasportfolio — Portfolio</h1>
<p align="center">A sleek, animated personal portfolio with a companion dashboard for live content management.</p>

<div align="center">
  <a href="#✨-features">Features</a> •
  <a href="#🛠️-tech-stack">Tech Stack</a> •
  <a href="#🚦-getting-started">Getting Started</a> •
  <a href="#📁-project-structure">Structure</a>
</div>

---

## ✨ Features

- **Animated UI** — Framer Motion spring animations, custom cursor, gradient orbs, typing effect
- **Live Content** — All sections (Hero, About, Skills, Projects, Journey, Contact) read from Firestore
- **Graceful Fallback** — Hardcoded defaults display when Firebase is unavailable
- **Swipeable Gallery** — Click the profile photo to expand; swipe through gallery images on touch devices
- **Theme Toggle** — Switch between cold and warm color schemes
- **Resume Download** — One-click download with proper filename
- **Mobile Optimized** — Touch detection disables heavy animations, CSS animations replace JS loops
- **Loading Screen** — Smooth entrance transition

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Backend | Firebase Firestore |
| Icons | Lucide React |
| Fonts | Google Fonts (Inter, DM Sans) |

## 🚦 Getting Started

```bash
# Clone the repo
git clone https://github.com/sibap-dev/sibasportfolio.git
cd sibasportfolio

# Fill in your Firebase config values

# Install & run
npm install
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `VITE_FIREBASE_APP_ID` | ✅ | Firebase app ID |

```bash
# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/        # React components (Hero, About, Skills, etc.)
├── hooks/             # Custom hooks (useFirebaseData, useTouchDevice)
├── App.jsx            # Root app with theme + touch detection
├── main.jsx           # Entry point
└── index.css          # Global styles + mobile perf overrides
```

## 🔗 Related

- [Portfolio Dashboard](https://github.com/sibap-dev/portdash) — Content management app for this portfolio

---

<div align="center">
  Built with ❤️ using Vite + React
</div>

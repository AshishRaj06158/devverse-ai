# DevVerse AI 🚀

> A comprehensive AI-powered career development platform for students and developers — built with React, TypeScript, Express, and Google Gemini.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 📄 **Resume Analyzer** | ATS scoring, keyword gap analysis, grammar & formatting checks |
| 🛠️ **Resume Builder** | AI bullet point rewriter with PDF-ready templates |
| ✉️ **Cover Letter Gen** | Role-specific cover letters matched to job descriptions |
| 🎤 **Interview Coach** | Mock technical & behavioral interviews with AI feedback |
| 📚 **Notes Summarizer** | PDF to flashcards, quiz, chapters & mind map |
| 📊 **PYQ Analyzer** | Previous year question trend analysis & predictions |
| 💻 **Coding Tracker** | Log problems, track streaks, visualize progress |
| 🌐 **Portfolio Builder** | One-click downloadable HTML portfolio generator |
| 👤 **About Page** | Personal contact connect card with message form |
| 🛡️ **Admin Panel** | User management, system stats & announcements |

---

## 🏗️ Project Structure

```
portfolio/
├── frontend/          # Vite + React + TypeScript SPA
│   ├── src/
│   │   ├── pages/     # All 10+ module pages
│   │   ├── components/# Navbar, Footer, layout
│   │   └── context/   # Firebase AuthContext
│   ├── .env.example   # Required env vars template
│   └── vercel.json    # Vercel deployment config
│
├── backend/           # Express + TypeScript API
│   ├── src/
│   │   ├── routes/    # aiRoutes, adminRoutes
│   │   ├── controllers/ # aiController (Gemini + PDF)
│   │   └── config/    # Gemini SDK config
│   ├── .env.example   # Required env vars template
│   └── dist/          # Compiled output (auto-generated)
│
└── render.yaml        # Full-stack Render deployment config
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone & Install

```bash
git clone https://github.com/AshishRaj06158/portfolio.git
cd portfolio

# Install frontend
cd frontend && npm install

# Install backend
cd ../backend && npm install
```

### 2. Configure Environment

```bash
# Frontend
cp frontend/.env.example frontend/.env
# → Fill in your Firebase credentials

# Backend
cp backend/.env.example backend/.env
# → Fill in your Gemini API Key
```

### 3. Run Locally

```bash
# Terminal 1 — Backend API (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Open: **http://localhost:3000**

---

## ☁️ Deploy to Render (Recommended)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint**
3. Connect your GitHub repo — Render will auto-detect `render.yaml`
4. Set the secret environment variables in Render dashboard:
   - **Backend:** `GEMINI_API_KEY`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
   - **Frontend:** All `VITE_FIREBASE_*` keys
5. Click **Deploy** — both services deploy automatically ✅

## ☁️ Deploy Frontend to Vercel (Alternative)

1. Import the `frontend/` folder into [vercel.com](https://vercel.com)
2. Set all `VITE_*` environment variables in Vercel project settings
3. Set `VITE_API_URL` to your deployed Render backend URL
4. Deploy ✅

---

## 🔑 Environment Variables

### Frontend (`frontend/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (`http://localhost:5000` or Render URL) |
| `VITE_FIREBASE_API_KEY` | Firebase Web App API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

### Backend (`backend/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `GEMINI_API_KEY` | Google Gemini AI API Key |
| `FIREBASE_PROJECT_ID` | Firebase Admin SDK Project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key |

---

## 👤 Developer

**Ashish Raj**
- 📱 Phone / WhatsApp: [+91 9771596801](https://wa.me/919771596801)
- 💼 LinkedIn: [linkedin.com/in/ashish-raj-17b8a8396](https://www.linkedin.com/in/ashish-raj-17b8a8396)
- 🐙 GitHub: [github.com/AshishRaj06158](https://github.com/AshishRaj06158)

---

## 📄 License

MIT — Free for personal and educational use.

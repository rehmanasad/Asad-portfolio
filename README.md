<div align="center">

  # 🚀 Asad ur Rehman — Portfolio

  **Personal portfolio of Asad ur Rehman — Software Engineer (Full-Stack & AI).**

  Built with React 19, Vite, Tailwind v4, GSAP, Framer Motion, and Three.js.
  Contact form is wired to **EmailJS** (instant email) and **Firebase Firestore** (persistent storage).

</div>

---

## ✨ Stack

- **Frontend:** React 19 + Vite + Tailwind CSS v4
- **Animation/3D:** GSAP, Framer Motion, Three.js, @react-three/fiber
- **Routing:** React Router v7
- **Forms:** EmailJS (`@emailjs/browser`) + Firebase Firestore
- **Deployment:** Vercel

---

## 🛠 Local Development

```bash
git clone https://github.com/<your-username>/asad-ur-rehman-portfolio.git
cd asad-ur-rehman-portfolio
npm install
cp .env.example .env       # then fill in the keys (see below)
npm run dev                # http://localhost:5173
```

The site will run without the `.env` keys — only the contact/quote forms need them. Firebase initialization is conditional, so missing config silently disables Firestore writes (EmailJS still works).

---

## 🔑 Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Source |
|---|---|
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_CONFIRM_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | [EmailJS dashboard](https://dashboard.emailjs.com/admin) |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | [Firebase Console](https://console.firebase.google.com) → Project Settings → SDK setup |

> ⚠️ Never commit `.env`. It's already in `.gitignore`.
> Vite exposes anything prefixed with `VITE_` to the browser — **only put public/client-safe keys here**. Firebase web config and EmailJS public keys are designed to be public; database rules + EmailJS quotas are what protect them.

---

## 🔥 Firebase setup

The contact form writes submissions to two Firestore collections:
- `contact_messages` — from the homepage Contact section
- `quote_requests` — from the `/quote` page

After creating your Firebase project (steps in the chat guide), set Firestore rules to allow public writes but restrict reads:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_messages/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /quote_requests/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

You'll view submissions in the Firebase Console → Firestore Database tab.

---

## 🚢 Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all `VITE_*` keys from your `.env` to Vercel → Project Settings → Environment Variables.
4. Vercel auto-detects Vite. Default build command `npm run build`, output `dist/`. Just hit Deploy.

The included [`vercel.json`](./vercel.json) handles SPA rewrites for client-side routing.

### Firebase Hosting (alternative — not used)

The repo also includes a [`firebase.json`](./firebase.json) for Firebase Hosting. We don't use it (Vercel handles hosting) — it's harmless to keep, or you can delete it.

---

## 📁 Project structure

```
src/
├── App.jsx
├── main.jsx
├── assets/                    # images, fonts, 3D models
├── components/
│   ├── 3d/                    # Three.js scenes
│   ├── common/                # loaders, ScrollToTop
│   ├── layout/                # Navbar, Layout
│   ├── sections/              # Hero, About, Skills, Experience, Services, Work, Contact, Footer
│   └── ui/                    # Accordion, etc.
├── context/                   # ThemeContext
├── hooks/                     # useSEO, useLenis, useScrollLock
├── lib/
│   ├── emailjs.js             # EmailJS env loader
│   ├── firebase.js            # Firebase init (Firestore)
│   ├── saveSubmission.js      # Helper to write a submission to Firestore
│   └── validation.js          # Form validators
└── pages/                     # Home, Portfolio, Services, Quote, NotFound
```

---

## 📜 Scripts

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production bundle to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint

---

<div align="center">
  <i>Originally forked from a friend's portfolio template; rebuilt and personalized.</i>
</div>

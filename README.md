# 📧 Email Manager PWA

<p align="center">
  <!-- Replace with your project logo -->
  <img src="docs/logo.png" alt="Email Manager Logo" width="120"/>
</p>

<p align="center">
  <a href="https://github.com/3GosEarthWeb/email-manager-pwa/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/yourname/email-manager-pwa/ci.yml?branch=main&label=build" alt="Build Status"/>
  </a>
  <a href="https://github.com/3GosEarthWeb/email-manager-pwa/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/3GosEarthWeb/email-manager-pwa" alt="License"/>
  </a>
  <img src="https://img.shields.io/github/package-json/v/3GosEarthWeb/email-manager-pwa" alt="Version"/>
  <img src="https://img.shields.io/badge/PWA-Installable-brightgreen" alt="PWA Badge"/>
</p>

---

## 🚀 Overview

**Email Manager PWA** is a modern, installable Progressive Web App (PWA) for managing email accounts across multiple providers.  
It’s lightweight, mobile-first, and works offline with service workers.

---

## ✨ Features

✅ Multi-account email support (Gmail, Outlook, IMAP)  
✅ Offline-first with Service Worker & IndexedDB  
✅ Unified inbox with search and filtering  
✅ Compose, reply, forward emails with rich editor  
✅ Dark mode + theme customization  
✅ Email encryption with `crypto-js`  
✅ Notifications for new emails (desktop + mobile)  
✅ Contact management & auto-complete  
✅ Installable on desktop/mobile as a PWA  
✅ Admin dashboard with analytics + usage logs  

---

## 📂 Folder Structure

```bash
email-manager-pwa/
│── public/
│   ├── manifest.json   # PWA manifest
│   ├── service-worker.js
│   └── icons/
│
│── src/
│   ├── assets/         # images, logos
│   ├── components/     # reusable UI components
│   ├── context/        # Auth + Email Context
│   ├── layouts/        # MainLayout, AuthLayout
│   ├── pages/          # Dashboard, Inbox, Settings
│   ├── services/       # API + crypto-js helpers
│   ├── hooks/          # custom React hooks
│   ├── styles/         # global + variables.css
│   ├── App.jsx
│   └── main.jsx
│
│── package.json
│── README.md
│── LICENSE
│── .gitignore
```

---

## 🛠️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/3GosEarthWeb/email-manager-pwa.git
   cd email-manager-pwa
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run in dev mode**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

---

## 📱 PWA Install

* On **Chrome/Edge**:  
  → Open the app → Click the **Install App** icon in the URL bar  
* On **Mobile (Android/iOS)**:  
  → Open in browser → “Add to Home Screen”

---

## 🔒 Security

* Passwords & tokens never stored in plain text  
* Email content encryption via `crypto-js`  
* HTTPS + Secure cookies  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests welcome!  
Please open an issue to discuss major changes.

---

## 👨‍💻 Author

Built with ❤️ by [Ogwusearch](https://github.com/Ogwusearch)


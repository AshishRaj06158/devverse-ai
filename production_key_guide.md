# DevVerse AI - Production Keys Setup Guide

This guide details how to replace the Sandbox/Mock mode configurations with **live production API keys** when deploying the DevVerse AI SaaS platform.

---

## 🔑 1. Google Gemini API Setup

To get real AI-powered suggestions, ATS scoring, quizzes, cover letters, and mock interview critiques:
1. Visit the [Google AI Studio](https://aistudio.google.com/).
2. Click **Create API Key** and select your Google Cloud project.
3. Copy the generated key.
4. Add it to the backend environment variables:
   ```env
   # backend/.env
   GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
   ```

---

## 🔒 2. Firebase Authentication & Database Setup

To enable user accounts, profile persistence, and security settings:

### Client-Side (Frontend Configuration)
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Project or select an existing one.
3. Click the **Web** icon `</>` to register a web app.
4. Copy the `firebaseConfig` object keys and add them to the frontend environment:
   ```env
   # frontend/.env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Server-Side (Backend Admin SDK Configuration)
To securely verify tokens and authenticate administration privileges:
1. In the Firebase Console, go to **Project Settings** > **Service Accounts**.
2. Click **Generate New Private Key** to download a JSON credentials file.
3. Open the downloaded file and add the credentials to the backend:
   ```env
   # backend/.env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ...\n-----END PRIVATE KEY-----\n"
   ```
   *(Note: Ensure the private key wraps newline `\n` characters in quotes properly).*

---

## 🚀 3. Connecting Frontend to Backend API

When deploying both client and API services:
1. Add the live backend server URL to the frontend environment:
   ```env
   # frontend/.env.production
   VITE_API_URL=https://your-backend-api-url.com
   ```
2. Enable CORS on the backend for security:
   ```typescript
   // backend/src/app.ts
   app.use(cors({ origin: 'https://your-frontend-url.com' }));
   ```

import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let db: any = null;
let auth: any = null;
let isFirebaseEnabled = false;

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (projectId && clientEmail && privateKey) {
  try {
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: formattedPrivateKey,
      }),
      databaseURL: `https://${projectId}.firebaseio.com`,
    });
    db = admin.firestore();
    auth = admin.auth();
    isFirebaseEnabled = true;
    console.log('Firebase Admin SDK successfully initialized.');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
  }
} else {
  console.warn(
    'Firebase Admin credentials incomplete in environment. The backend will operate in mock/local storage mode.'
  );
}

export { admin, db, auth, isFirebaseEnabled };

import env from 'env';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export const analytics = app.analytics();

if (env.NODE_ENV === 'development') {
  auth.useEmulator(env.FIREBASE_EMULATOR_HOST);
}

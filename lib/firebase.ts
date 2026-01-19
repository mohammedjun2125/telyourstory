import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQU7ULd-1fArBcknNvQu4H6_5Qf5gEJDo",
    authDomain: "telyourstory-dab5a.firebaseapp.com",
    projectId: "telyourstory-dab5a",
    storageBucket: "telyourstory-dab5a.firebasestorage.app",
    messagingSenderId: "949221115834",
    appId: "1:949221115834:web:59e860defdc2db83eebf83",
    measurementId: "G-EW9HKXSDNZ"
};

// Initialize Firebase (singleton pattern to avoid reloading in dev)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
let analytics: import("firebase/analytics").Analytics | undefined;

if (typeof window !== "undefined") {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, db, analytics };

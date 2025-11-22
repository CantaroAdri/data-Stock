import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDK-b1rfeahLq5pgWzG_2IqnFQJVc7czck",
  authDomain: "datos-stock.firebaseapp.com",
  projectId: "datos-stock",
  storageBucket: "datos-stock.firebasestorage.app",
  messagingSenderId: "932624500503",
  appId: "1:932624500503:web:551171cd8231daced59952"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const database = getDatabase(app);
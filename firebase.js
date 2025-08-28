import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChn-wqLeSO9Lu8dAJoS_-QOFhsxsa8Q_I",
    authDomain: "mathmaster-cbffc.firebaseapp.com",
    databaseURL: "https://mathmaster-cbffc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mathmaster-cbffc",
    storageBucket: "mathmaster-cbffc.firebasestorage.app",
    messagingSenderId: "960927054246",
    appId: "1:960927054246:web:dc7245afc5dd018cb9b767",
    measurementId: "G-13D7XQ8TVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = 

// Export services
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyArDYI83bDFvwU9oGUfvlN9Y9XbUDCY1MM",
    authDomain: "expo-7dd3c.firebaseapp.com",
    databaseURL: "https://expo-7dd3c-default-rtdb.firebaseio.com",
    projectId: "expo-7dd3c",
    storageBucket: "expo-7dd3c.appspot.com",
    messagingSenderId: "1022484286943",
    appId: "1:1022484286943:web:718a14bc663ab6e245486a",
    measurementId: "G-068G67TB1N",
    databaseURL: "https://expo-7dd3c-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const analytics = getAnalytics(app);

export default database
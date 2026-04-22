import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfhTXRNpgU-rHuhuGINBH72w4P4n2CVf4",
  authDomain: "petsuam.firebaseapp.com",
  projectId: "petsuam",
  storageBucket: "petsuam.firebasestorage.app",
  messagingSenderId: "539690149129",
  appId: "1:539690149129:web:b1f812828cb3d1651a1fd8",
  measurementId: "G-T1SBYST2TH",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
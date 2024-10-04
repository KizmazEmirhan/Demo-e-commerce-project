
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFF_XC3JIf0YJi7UqH73SRcbFYYz2T-gA",
  authDomain: "e-commerceproject-367c4.firebaseapp.com",
  projectId: "e-commerceproject-367c4",
  storageBucket: "e-commerceproject-367c4.appspot.com",
  messagingSenderId: "325218704878",
  appId: "1:325218704878:web:1349526b7f53a58f6b42ff",
  measurementId: "G-58K1SK719B",
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA24S3oQXB5xUzMNdFIl-3yAcl_cCPceA",
  authDomain: "bfagencia-df00f.firebaseapp.com",
  projectId: "bfagencia-df00f",
  storageBucket: "bfagencia-df00f.firebasestorage.app",
  messagingSenderId: "806126782308",
  appId: "1:806126782308:web:d2c9439533ee6355b5dc71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveLead = async (data: any) => {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Lead saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export { db };
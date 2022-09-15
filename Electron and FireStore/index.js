  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAKwFiPpnjEVWLUDOdhZwVED4wvyn0zqqU",
    authDomain: "sample-app-321.firebaseapp.com",
    projectId: "sample-app-321",
    storageBucket: "sample-app-321.appspot.com",
    messagingSenderId: "849654839705",
    appId: "1:849654839705:web:a47e2cf3dac5c39e917b08",
    measurementId: "G-QCFVX20M67"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export { db };

  

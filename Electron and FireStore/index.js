  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "",
    authDomain: "sample-app-321.firebaseapp.com",
    projectId: "sample-app-321",
    storageBucket: "sample-app-321.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export { db };

  

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import {
  getFirestore,
  collection,
	setDoc,
	doc
} from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Firebase configuration based on server or client
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID,
    measurementId: config.public.FIREBASE_MEASUREMENT_ID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Get a list of users from the database
  const db = getFirestore(app);
  const users = collection(db, 'users');


	// ---------------------- auth ----------------------

const registerUser = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if (user) {
      const userDocRef = doc(db, 'users', user.uid);

      await setDoc(userDocRef, {
        uid: user.uid,
        email: email,
      });
    }
  } catch (e) {
    console.log('Error adding document: ', e);
  }
};

  return {
    provide: {
      db,
      users,
      auth,
			registerUser 
    }
  };
});

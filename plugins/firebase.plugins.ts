import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import type { Auth } from "firebase/auth";
import type { Pinia } from "pinia";
import {
	getFirestore,
	collection,
	setDoc,
	doc,
	getDoc,
} from "firebase/firestore";

import useUserStore from "../stores/user";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();
	const pinia = nuxtApp.pinia as Pinia;

	// Firebase configuration based on server or client
	const firebaseConfig = {
		apiKey: config.public.FIREBASE_API_KEY,
		authDomain: config.public.FIREBASE_AUTH_DOMAIN,
		projectId: config.public.FIREBASE_PROJECT_ID,
		storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
		appId: config.public.FIREBASE_APP_ID,
		measurementId: config.public.FIREBASE_MEASUREMENT_ID,
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const $firebaseAuth = getAuth(app);
	const auth = getAuth(app);
	nuxtApp.provide("$firebaseAuth", auth);

	// Get a list of users from the database
	const db = getFirestore(app);
	const users = collection(db, "users");

  const router = useRouter()
  
	// ---------------------- auth ----------------------

	const registerUser = async (email: string, password: string) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (user) {
				const userDocRef = doc(db, "users", user.uid);
				await setDoc(userDocRef, { uid: user.uid, email: email });
				return user; // Return the user object
			}
		} catch (error) {
			throw error; // Throw the error to be caught in the calling function
		}
	};

	const loginUser = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
      const userStore = useUserStore(pinia);
      userStore.setUser(userCredential.user.uid, userCredential.user.email);
			return userCredential.user; // Return the user object
		} catch (error) {
			throw error; // Throw the error to be caught in the calling function
		}
	};

	// a signout that also changes the user store
	const signOutUser = async () => {
		try {
			await auth.signOut();
			const userStore = useUserStore(pinia);
			userStore.setUser(null, null);
      router.push('/login')
		} catch (error) {
			throw error;
		}
	};

	onAuthStateChanged($firebaseAuth, (user) => {
		const userStore = useUserStore(pinia); // Use the Pinia instance

		if (user) {
			userStore.setUser(user.uid, user.email);
		} else {
			console.log("No user is logged in");
		}
	});

	// ---------------------- travelDetails ----------------------

	// Function to fetch travel details
	const fetchUserTravelDetails = async (userId: String) => {
		console.log("Fetching travel details for user:", userId);
		const db = getFirestore();
		const docRef = doc(db, `users/${userId}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();
			console.log("Fetched user data:", userData);
			return userData.travelDetails || null;
		} else {
			console.log("No such user document!");
			return null;
		}
	};

	const fetchSpecificCountryDetails = async (
		userId: string,
		encodedCity: string
	) => {
		const city = decodeURIComponent(encodedCity);
		console.log("Fetching travel details for user:", userId);
		const db = getFirestore();
		const docRef = doc(db, `users/${userId}`);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();
			console.log("Fetched user data:", userData);

			// Ensure travelDetails and cities exist in userData
			if (userData.travelDetails && userData.travelDetails.cities) {
				for (const c in userData.travelDetails.cities) {
					if (c.toLowerCase() === city.toLowerCase()) {
						return userData.travelDetails.cities[c];
					}
				}
			}

			console.log("City not found in user's travel details!");
			return null;
		} else {
			console.log("No such user document!");
			return null;
		}
	};

	return {
		provide: {
			db,
			users,
			auth,
			registerUser,
			loginUser,
			signOutUser,
			fetchUserTravelDetails,
			fetchSpecificCountryDetails,
		},
	};
});

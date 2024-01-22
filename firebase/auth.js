import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import auth from "../plugins/firebase.plugins";
import db from "../plugins/firebase.plugins";

// const signup = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Ensure the user is correctly created before proceeding
//     if (!user) throw new Error("User creation failed");

//     await setDoc(doc(db, "users", user.uid), {
//       email // Make sure the 'email' field is correctly structured
//     });

//     // Add redirect or further processing here
//   } catch (error) {
//     console.error("Error signing up: ", error.message);
//     // Add more specific error handling based on error.code
//   }
// };


export default { auth, signup };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";
import {env} from "$env/dynamic/public";

import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: env.PUBLIC_FIREBASE_API_KEY,
    authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.PUBLIC_FIREBASE_MESSENGER_SENDER_ID,
    appId: env.PUBLIC_FIREBASE_APP_ID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const actionCodeSettings = {
    url: env.PUBLIC_FIREBASE_CONFIRMATION_EMAIL_REDIRECT,
}
export async function register(name: string, email: string, password: string){
    const result =  await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {displayName: name});
    await sendEmailVerification(result.user);
    console.log("result", result);
    return result;
}
export async function resetPassword(){
    if (!auth.currentUser) return;
    await sendPasswordResetEmail(auth, auth.currentUser.email!, {
        url: `${env.PUBLIC_FIREBASE_PASSWORD_RESET_EMAIL_REDIRECT}`,
    });
}

export async function login(email: string, password: string){
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(){
    return await auth.signOut();
}
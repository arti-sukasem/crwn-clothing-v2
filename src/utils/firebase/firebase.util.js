// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, doc, getDocs, setDoc, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU6R7WmbQ0jXT2a_IWFMPbfifGZGVpWwo",
  authDomain: "crwn-clothing-485a7.firebaseapp.com",
  projectId: "crwn-clothing-485a7",
  storageBucket: "crwn-clothing-485a7.appspot.com",
  messagingSenderId: "610209881689",
  appId: "1:610209881689:web:aeb3c7215552eda7efdb48"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdBy = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdBy
            });
        } catch(error) {
            console.log('error creating a document', error.message);
        }
    }
    return userDocRef;
}
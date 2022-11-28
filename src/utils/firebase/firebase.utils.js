import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwMJZJrYTw3UfDz-qj-v3NJdSYn-EonEk",
    authDomain: "crwn-clothing-app-mark.firebaseapp.com",
    projectId: "crwn-clothing-app-mark",
    storageBucket: "crwn-clothing-app-mark.appspot.com",
    messagingSenderId: "190176634177",
    appId: "1:190176634177:web:10a3a009b08f297263adc0"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt
            })
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
   
  }
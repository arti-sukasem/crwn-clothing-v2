import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import Button from '../../components/button/button.component';

const SignIn = () => {
  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if (response) {
      const userDocRef = await createUserDocumentFromAuth(response.user)
    }
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const logGoogleUserRedirect = async () => {
    const response = await signInWithGoogleRedirect();
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button buttonType='google' onClick={logGoogleUser}>Sign in with Google Popup</Button>
      <Button buttonType='google' onClick={logGoogleUserRedirect}>Sign in with Google Redirect</Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

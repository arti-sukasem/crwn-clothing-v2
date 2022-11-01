import { useState } from 'react'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUsersWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {   
            const response = await signInAuthUsersWithEmailAndPassword(email, password)
            console.log(response);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/too-many-requests': 
                    alert('this account has been temporarily suspended due to many failed login attempts');
                    break;

                case 'auth/user-not-found': 
                    alert('no user associated with this email');
                    break;

                default:
                    alert(error.code)
            }
            if (error.code === 'auth/too-many-requests') {
                
            } else {
                console.log(error);
            }
        };
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value})
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                label="Email" 
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>

                <FormInput 
                label = "Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>
                <div className='buttons-container'>
                    <Button type="submit"> Sign in </Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}> Sign in with Google </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
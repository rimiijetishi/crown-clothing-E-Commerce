import { SignInContainer, ButtonsContainer} from './sign-in-form.style'

import { useState } from "react";
import { 
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';


const defaultFormFields = {
  email: '',
  password: '',
};


const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const resetFormFilds = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword( email, password);
      resetFormFilds();

    } catch (error) {
      if (error.code === 'auth/invalid-credential'){
        alert('This Account dose not exist, please check your spelling ');
      }else {
        console.log(error)
      }
    }
  };
  

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value})
  }


  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          type='email' 
          required 
          name='email' 
          onChange={handleChange}
          value={email}
        />

        <FormInput 
          label='Password'
          type='password' 
          required 
          name='password' 
          onChange={handleChange}
          value={password}
        />

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
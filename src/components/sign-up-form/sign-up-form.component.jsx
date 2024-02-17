import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';


import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from './sign-up-form.style';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName ,email ,password, confirmPassword } = formFields;



  const resetFormFilds = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword){
      alert('password do not match!');
      return;
    }

    try {
      const { user }= await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});

      resetFormFilds();

    }catch(error) {
      
      if (error.code === 'auth/email-already-in-use'){
        alert('This email is already  exists!')

      }else {
        console.log('user creation encountered an error', error)
      }
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value})
  }


  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text' 
          required 
          name='displayName' 
          onChange={handleChange}
          value={displayName}
        />

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

        <FormInput 
          label='Confirm Password'
          type='password' 
          required 
          onChange={handleChange}
          name='confirmPassword' 
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
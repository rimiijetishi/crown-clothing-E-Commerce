import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';


export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});


export const USER_ACITON_TYPS = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}


const userReducer = (state, action) => {
  console.log(action);


  const { type, palyload } = action;

  switch(type){
    case USER_ACITON_TYPS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: palyload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}


const INITIAL_STATE = {currentUser: null}

export const UserProvider = ({children}) => {
  const [ { currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);


  const setCurrentUser = (user) => {
    dispatch({type: USER_ACITON_TYPS.SET_CURRENT_USER, palyload: user })
  }

  const value = {currentUser, setCurrentUser};

  
  useEffect(() => {
    const unsubcribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubcribe
  }, []);



  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  );
};
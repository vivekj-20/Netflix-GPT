import React, { useState, useRef } from 'react';
import Header from './header';
import checkValidData from "../utils/validation";
import auth from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
import { LOGO, USER_AVATAR } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    
    const handleButtonClick = () => {
        let error = null;

        if (!isSignInForm && !name.current.value) {
            error = "User name is mandatory";
        }
        const validationMessage = checkValidData(email.current.value, password.current.value);
        if (validationMessage) {
            error = validationMessage;
        }
        setErrorMessage(error);

        if(error) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value
            )
              .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                  displayName: name.current.value,
                  photoURL: USER_AVATAR,
                })
                  .then(() => {
                    const { uid, email, displayName, photoURL } = auth.currentUser;
                    dispatch(
                      addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                      })
                    );
                  })
                  .catch((error) => {
                    setErrorMessage(error.message);
                  });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
          } else {
            // Sign In Logic
            signInWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value
            )
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
              });
          }
        };
    return (
        <div>
            <Header />
            <div className="fixed md:inset-0"><img className="w-full h-screen object-cover" src={LOGO} alt="logo"/></div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <p className='bg-red-950'>This is a Netflix clone made to integrate GPT feature for education purpose.</p>
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        ref={name} 
                        type="text" 
                        placeholder="Name" 
                        className="p-4 my-4 w-full bg-black border-white"
                    />
                )}

                <input 
                    ref={email}
                    type="text" 
                    placeholder="Email Address" 
                    className="p-4 my-4 w-full bg-black border-white"
                />
                
                <input
                    ref={password} 
                    type="password" 
                    placeholder="Password" 
                    className="p-4 my-4 w-full bg-black border-white"
                />
                
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

                <button 
                    className="p-4 my-6 bg-red-700 w-full rounded-lg hover:bg-red-600" 
                    onClick={handleButtonClick}
                    type="button"
                >
                    {isSignInForm ? "Sign In to Netflix GPT" : "Sign Up to Netflix GPT"}
                </button>
                
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    );
};

export default Login;

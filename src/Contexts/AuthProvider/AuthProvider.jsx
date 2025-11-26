import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password
  const createUser = (eamil, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, eamil, password);
  };
  //This function will look after the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //Login with email and password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //SignIn or Login with google
  const signInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // update user info
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  //Component for signOut user
  const UserSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const AuthInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInwithGoogle,
    UserSignOut,
    updateUserProfile,
  };
  return <AuthContext value={AuthInfo}>{children}</AuthContext>;
};

export default AuthProvider;

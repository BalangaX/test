// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const docData = userDoc.exists() ? userDoc.data() : {};
          const tokenResult = await user.getIdTokenResult(true);
          const adminFlag = !!tokenResult.claims.admin || !!docData.isAdmin;
          setCurrentUser({ ...user, ...docData, isAdmin: adminFlag });
        } catch (err) {
          setCurrentUser({ ...user, isAdmin: false });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const docData = userDoc.exists() ? userDoc.data() : {};
      const token = await user.getIdTokenResult(true);
      setCurrentUser({ ...user, ...docData, isAdmin: !!token.claims.admin || !!docData.isAdmin });

      setLoading(false);
      return cred;
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          throw new Error("username or password is incorrect");
        case "auth/invalid-email":
          throw new Error("the email address you entered is invalid");
        case "auth/too-many-requests":
          throw new Error("you have made too many failed attempts. try again later.");
        default:
          throw new Error("an unknown error occurred during login. try again.");
      }
    }
  };

  const register = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await setDoc(doc(db, "users", user.uid), {
        username: username.toLowerCase(),
        email: email,
        createdAt: Date.now(),
      });

      return userCredential;
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("this email is already in use");
        case "auth/weak-password":
          throw new Error("password is too weak");
        case "auth/invalid-email":
          throw new Error("invalid email");
        default:
          throw new Error("an unknown error occurred during registration");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
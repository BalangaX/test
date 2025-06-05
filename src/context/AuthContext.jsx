// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { doc as firestoreDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

// Hook לגישה לקונטקסט
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // מאזין לשינויי התחברות רגילים ב־Firebase
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch username from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setCurrentUser({ ...user, username: userDoc.data().username });
          } else {
            setCurrentUser(user);
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
          setCurrentUser(user);
        }
        // בדוק custom claim admin
        user.getIdTokenResult().then(token => {
          setIsAdmin(!!token.claims.admin);
        });
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // פונקציית login משולבת
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, username) => {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    // Save username to Firestore
    try {
      await setDoc(firestoreDoc(db, "users", user.uid), {
        username: username,
        email: email,
        createdAt: Date.now()
      });
    } catch (err) {
      console.error("Error saving username to Firestore:", err);
    }
    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const value = {
    currentUser,
    loading,
    isAdmin,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
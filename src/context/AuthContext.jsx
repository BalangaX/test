// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
    // בדוק האם יש משתמש אדמין ב-localStorage
    const storedAdmin = localStorage.getItem("sb_admin");
    if (storedAdmin) {
      const adminUser = JSON.parse(storedAdmin);
      setCurrentUser({ ...adminUser, isAdmin: true });
      setLoading(false);
      return;
    }

    // מאזין לשינויי התחברות רגילים ב־Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // הכן המשתמש עם flag זמני
        setCurrentUser(user);
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

  // כניסת admin
  const loginAsAdmin = () => {
    const fakeUser = { email: "admin@local", displayName: "Administrator" };
    localStorage.setItem("sb_admin", JSON.stringify(fakeUser));
    setCurrentUser(fakeUser);
    setIsAdmin(true);
  };

  // פונקציית login משולבת
  const login = async (email, password) => {
    // אם admin
    if (email === "1111" && password === "1111") {
      loginAsAdmin();
      return;
    }
    // משתמש רגיל
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    localStorage.removeItem("sb_admin");
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
    loginAsAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
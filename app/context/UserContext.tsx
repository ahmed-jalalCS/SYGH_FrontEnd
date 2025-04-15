"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token); // ✅ خزّن التوكن
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");// ✅ احذف التوكن
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

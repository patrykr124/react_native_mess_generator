import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setuser(res);
        } else {
          setIsLoggedIn(false);
          setuser(false);
        }
      })
      .catch((err) => {
        console.log("provider: ", err);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return <globalContext.Provider value={{isLoading,setIsLoggedIn,user,setuser,isLoggedIn}}>{children}</globalContext.Provider>;
};

export default GlobalProvider;

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Initialize state directly from localStorage
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      return {
        user: parseData.user,
        token: parseData.token,
      };
    }
    return {
      user: null,
      token: "",
    };
  });

  //Sync auth state → localStorage automatically
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

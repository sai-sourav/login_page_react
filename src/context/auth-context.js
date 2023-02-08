import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: (email, password, collegename) => {}
});

export const AuthenticationProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginfo = localStorage.getItem("isloggedin");
    if (loginfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, collegename) => {
    localStorage.setItem("isloggedin", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isloggedin", "0");
  };

  const values = {
        isLoggedIn: isLoggedIn,
        loginHandler,
        logoutHandler
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;

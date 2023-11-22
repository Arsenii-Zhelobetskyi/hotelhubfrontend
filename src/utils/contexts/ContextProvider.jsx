import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StateContext = createContext({
  email: null,
  name: null,
  token: null,
  setUser: () => {},
  setName: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [email, _setEmail] = useState(
    localStorage.getItem("ACCESS_USER_EMAIL")
  );
  const [name, _setName] = useState(localStorage.getItem("ACCESS_USER_NAME"));
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const dispatch = useDispatch();

  const setEmail = (email) => {
    _setEmail(email);
    if (email) {
      localStorage.setItem("ACCESS_USER_EMAIL", email);
    } else {
      localStorage.removeItem("ACCESS_USER_EMAIL");
    }
  };
  const setName = (name) => {
    _setName(name);
    if (name) {
      localStorage.setItem("ACCESS_USER_NAME", name);
    } else {
      localStorage.removeItem("ACCESS_USER_NAME");
    }
  };
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        email,
        name,
        token,
        setEmail,
        setName,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StateContext = createContext({
  user: null,
  setUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(() => {
    const storedUser = localStorage.getItem("ACCESS");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log("user", user);

  const setUser = (user) => {
    _setUser(user);
    if (user) {
      localStorage.setItem("ACCESS", JSON.stringify(user));
    } else {
      localStorage.removeItem("ACCESS");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

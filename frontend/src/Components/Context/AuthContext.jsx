import React, { createContext, useEffect, useReducer } from "react";
import api from "../ApiConfig";

export const quizContext = createContext();

const initialState = { currentuser: null };
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };
    default:
      return state;
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData, token) => {
    localStorage.setItem("quizToken", JSON.stringify(token));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    async function getCurrentUser() {
      const token = JSON.parse(localStorage.getItem("quizToken"));
      try {
        const response = await api.post("/currentuser", { token });

        if (response.data.success) {
          dispatch({
            type: "LOGIN",
            payload: response?.data?.currentuser,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCurrentUser();
  }, []);
  return (
    <quizContext.Provider value={{ login, state, logout }}>
      {children}
    </quizContext.Provider>
  );
};

export default AuthContext;

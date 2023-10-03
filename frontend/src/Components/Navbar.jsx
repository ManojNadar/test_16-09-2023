import React, { useContext } from "react";
import { quizContext } from "./Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, logout } = useContext(quizContext);
  const route = useNavigate();

  return (
    <>
      <nav>
        <div className="logo">
          <h1 onClick={() => route("/")}>Quiz App</h1>
        </div>
        <div className="allNavs">
          <h1>All Quiz</h1>

          {state?.currentuser?.role == "Admin" ? (
            <h1 onClick={() => route("/addquiz")}>Add Quiz</h1>
          ) : null}
        </div>
        {state?.currentuser?.name ? (
          <div className="profSection">
            <h2>{state?.currentuser?.name}</h2>
            <NavLink onClick={logout}>LOGOUT</NavLink>
          </div>
        ) : (
          <NavLink to="/login">LOGIN</NavLink>
        )}
      </nav>
    </>
  );
};

export default Navbar;

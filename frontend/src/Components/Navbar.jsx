import React, { useContext } from "react";
import { quizContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, logout } = useContext(quizContext);
  const route = useNavigate();

  return (
    <>
      <nav
        style={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "space-around",
          borderBottom: "2px solid red",
          alignItems: "center",
        }}
      >
        <div>
          <h1 onClick={() => route("/")}>Quiz App</h1>
        </div>
        <div
          style={{
            display: "flex",
            width: "20%",
            justifyContent: "space-around",
          }}
        >
          <h1 onClick={() => route("/allquiz")}>All Quiz</h1>

          {state?.currentuser?.role == "Admin" ? (
            <h1 onClick={() => route("/addquiz")}>Add Quiz</h1>
          ) : null}

          {state?.currentuser && <h1>{state?.currentuser?.name} </h1>}
        </div>
        {state?.currentuser?.name ? (
          <button onClick={logout}>LOGOUT</button>
        ) : (
          <button onClick={() => route("/login")}>LOGIN</button>
        )}
      </nav>
    </>
  );
};

export default Navbar;

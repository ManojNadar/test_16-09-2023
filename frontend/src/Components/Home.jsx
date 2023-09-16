import React, { useContext } from "react";
import { quizContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state, logout } = useContext(quizContext);
  const route = useNavigate();
  return (
    <>
      <h1>Home</h1>

      <div>
        {state?.currentuser?.role == "Student" && (
          <div>
            <button onClick={()=> route('/solvequiz')}>Solve Quiz</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

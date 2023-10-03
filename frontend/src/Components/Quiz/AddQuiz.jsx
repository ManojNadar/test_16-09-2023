import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../ApiConfig";
import toast from "react-hot-toast";
import { quizContext } from "../Context/AuthContext";

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    qn: "",
    ansOne: "",
    ansTwo: "",
    ansThree: "",
    ansFour: "",
    correctAnswer: "",
  });

  const route = useNavigate();
  const { state } = useContext(quizContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { qn, ansOne, ansTwo, ansThree, ansFour, correctAnswer } = quiz;

    if (qn && ansOne && ansTwo && ansThree && ansFour && correctAnswer) {
      const token = JSON.parse(localStorage.getItem("quizToken"));
      try {
        const response = await api.post("/addquiz", { quiz, token });

        if (response?.data?.success) {
          toast.success(response.data.message);
          setQuiz({
            qn: "",
            ansOne: "",
            ansTwo: "",
            ansThree: "",
            ansFour: "",
            correctAnswer: "",
          });
          route("/allquiz");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("all fields are mandatory");
    }
  };

  useEffect(() => {
    if (state?.currentuser?.role != "Admin") {
      route("/");
    }
  }, []);
  return (
    <>
      <div className="formContainer">
        <h1>Add Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter Question"
              onChange={handleChange}
              name="qn"
              value={quiz.qn}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              placeholder="Answer One"
              onChange={handleChange}
              name="ansOne"
              value={quiz.ansOne}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              placeholder="Answer Two"
              onChange={handleChange}
              name="ansTwo"
              value={quiz.ansTwo}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              placeholder="Answer Three"
              onChange={handleChange}
              name="ansThree"
              value={quiz.ansThree}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              placeholder="Answer Four"
              onChange={handleChange}
              name="ansFour"
              value={quiz.ansFour}
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              placeholder="Correct Answer"
              onChange={handleChange}
              name="correctAnswer"
              value={quiz.correctAnswer}
            />
          </div>
          <br />
          <div>
            <input type="submit" value="Add Quiz" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddQuiz;

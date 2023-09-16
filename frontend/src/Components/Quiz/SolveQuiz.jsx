import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig";
import { useNavigate } from "react-router-dom";
import { quizContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const SolveQuiz = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [answer, setAnswer] = useState("");
  const [singleQuiz, setSingleQuiz] = useState({});
  const [answerInput, setAnswerInput] = useState(false);
  //   console.log(allQuiz);

  //   console.log(singleQuiz);

  const route = useNavigate();
  const { state } = useContext(quizContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswer({ ...answer, [name]: value });
  };

  useEffect(() => {
    async function getAllQuiz() {
      try {
        const response = await api.get("/allquiz");

        if (response.data.success) {
          setAllQuiz(response.data.allQuiz);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllQuiz();
  }, []);

  useEffect(() => {
    if (state?.currentuser?.role != "Student") {
      route("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answer) {
      try {
        const response = await api.post("/solvequiz", { answer });

        if (response.data.success) {
          toast.success(response.data.message);
          setAnswerInput(false);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("answer is mandatory");
    }
  };

  const showAnswerinput = async (qnId) => {
    setAnswerInput(true);
    // console.log(qnId);

    try {
      const response = await api.post("/singlequiz", { qnId });
      if (response.data.success) {
        setSingleQuiz(response.data.singleQuiz);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>All Quiz</h1>

      {answerInput && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter your Answer"
            name="answer"
          />
          <input
            style={{
              backgroundColor: "greenyellow",
              marginBottom: "1%",
            }}
            type="submit"
            value="Submit Answer"
          />
        </form>
      )}

      <div style={{ width: "100%" }}>
        {allQuiz?.length ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              gap: "20px 0",
            }}
          >
            {allQuiz.map((quiz) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "48%",
                  flexWrap: "wrap",
                  border: "1px solid green",
                  marginLeft: "1%",
                }}
                key={quiz._id}
              >
                <h2
                  style={{
                    backgroundColor: "aqua",
                  }}
                >
                  Question - {quiz.qn}
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "48%",
                      flexWrap: "wrap",
                      backgroundColor: "grey",
                    }}
                  >
                    Option A - {quiz.ansOne}
                  </h2>
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "48%",
                      flexWrap: "wrap",
                      backgroundColor: "grey",
                    }}
                  >
                    Option B - {quiz.ansTwo}
                  </h2>
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "48%",
                      flexWrap: "wrap",
                      backgroundColor: "grey",
                    }}
                  >
                    Option C - {quiz.ansThree}
                  </h2>
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "48%",
                      flexWrap: "wrap",
                      backgroundColor: "grey",
                    }}
                  >
                    Option D - {quiz.ansFour}
                  </h2>

                  {!answerInput && (
                    <button onClick={() => showAnswerinput(quiz._id)}>
                      Solve Quiz
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Quiz</div>
        )}
      </div>
    </>
  );
};

export default SolveQuiz;

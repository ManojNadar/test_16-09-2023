import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig";
import { useNavigate } from "react-router-dom";
import { quizContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const SolveQuiz = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [page, setPage] = useState(1);
  const [radioVal, setRadioVal] = useState("");
  //   console.log(allQuiz);

  const route = useNavigate();
  const { state } = useContext(quizContext);

  useEffect(() => {
    async function getAllQuiz() {
      try {
        const response = await api.post("/allquiz", { page });

        if (response.data.success) {
          setAllQuiz(response.data.allQuiz);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllQuiz();
  }, [page]);

  useEffect(() => {
    if (state?.currentuser?.role != "user") {
      route("/");
    }
  }, []);

  const nextQn = async (id, qn, crtAns, userAns) => {
    console.log(id, qn, crtAns, userAns);

    if (userAns) {
      try {
        const token = JSON.parse(localStorage.getItem("quizToken"));
        const response = api.post("/solvequiz", {
          id,
          qn,
          crtAns,
          userAns,
          token,
        });

        if (response?.data?.success) {
          toast.success(response?.data?.message);
          setPage(page + 1);
        } else {
          console.log(response?.data?.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("choose the answer");
    }
  };

  const handleRadioValue = (e) => {
    setRadioVal(e.target.value);
  };

  return (
    <>
      <div>
        {allQuiz?.length ? (
          <div className="allQuizAnsParent">
            {allQuiz.map((quiz) => (
              <div key={quiz._id}>
                <h2>Question - {quiz.qn}</h2>
                <div className="allRadioParent">
                  <div>
                    <input
                      type="radio"
                      name="answers"
                      value={quiz.ansOne}
                      onClick={handleRadioValue}
                    />
                    <label>A - {quiz.ansOne}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="answers"
                      value={quiz.ansTwo}
                      onClick={handleRadioValue}
                    />
                    <label>B - {quiz.ansTwo}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="answers"
                      value={quiz.ansThree}
                      onClick={handleRadioValue}
                    />
                    <label>C - {quiz.ansThree}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="answers"
                      value={quiz.ansFour}
                      onClick={handleRadioValue}
                    />
                    <label>D - {quiz.ansFour}</label>
                  </div>
                </div>

                <button
                  onClick={() =>
                    nextQn(quiz._id, quiz.qn, quiz.correctAnswer, radioVal)
                  }
                >
                  Next
                </button>
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

import React, { useEffect, useState } from "react";
import api from "../ApiConfig";

const AllQuiz = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const [page, setPage] = useState(1);

  console.log(page);
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
  return (
    <>
      <h1>All Quiz</h1>

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
                    A - {quiz.ansOne}
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
                    B - {quiz.ansTwo}
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
                    C - {quiz.ansThree}
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
                    D - {quiz.ansFour}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No Quiz</div>
        )}
      </div>

      <button onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </>
  );
};

export default AllQuiz;

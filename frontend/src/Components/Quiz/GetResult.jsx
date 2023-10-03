import React, { useEffect, useState } from "react";
import api from "../ApiConfig";

const GetResult = () => {
  const [result, setResult] = useState([]);

  console.log(result);

  useEffect(() => {
    async function getResult() {
      try {
        const token = JSON.parse(localStorage.getItem("quizToken"));
        const response = await api.post("/getresult", { token });

        if (response.data.success) {
          setResult(response.data.myResult);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getResult();
  }, []);
  return (
    <div>
      {result?.length ? (
        <div>
          {result?.map((res) => (
            <div>
              {res.qn} - {res.userAns} - {res.crtAns}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GetResult;

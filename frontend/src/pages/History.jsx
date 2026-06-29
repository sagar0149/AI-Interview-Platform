import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

      const response =
        await axios.get(
          "http://127.0.0.1:8000/interview/history"
        );

      setHistory(
        response.data
      );
    };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>
        Interview History
      </h1>

      {history.map(
        (item) => (

          <div
            key={item.id}
            style={{
              border:
                "1px solid gray",
              padding: "20px",
              marginBottom: "20px"
            }}
          >

            <h3>
              Question
            </h3>

            <p>
              {item.question}
            </p>

            <h3>
              Answer
            </h3>

            <p>
              {item.answer}
            </p>

            <h3>
              Evaluation
            </h3>

            <pre>
              {item.evaluation}
            </pre>

          </div>
        )
      )}

    </div>
  );
}

export default History;
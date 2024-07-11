import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/getPosts");
        setData(response.data);
      } catch (err) {
        setError("Service temporarily unavailable");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from External Service</h1>
      {error && <p>{error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default App;

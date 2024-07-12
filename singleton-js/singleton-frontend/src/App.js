// src/App.js
import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchDbStatus } from "./services/api";

function App() {
  const [dbStatus, setDbStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDbStatus = async () => {
      try {
        const data = await fetchDbStatus();
        setDbStatus(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getDbStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Singleton System Design Pattern</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Database Status: {dbStatus ? dbStatus.status : "Loading..."}</p>
        )}
      </header>
    </div>
  );
}

export default App;

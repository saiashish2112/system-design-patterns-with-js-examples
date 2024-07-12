// src/components/HelloWorld.js
import React, { useEffect, useState } from "react";
import { fetchHelloWorld } from "../services/api";

const HelloWorld = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      const data = await fetchHelloWorld();
      setMessage(data);
    };

    getMessage();
  }, []);

  return <div>{message}</div>;
};

export default HelloWorld;

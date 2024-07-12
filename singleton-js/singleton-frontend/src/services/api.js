// src/services/api.js
export const fetchDbStatus = async () => {
  try {
    const response = await fetch("http://localhost:3001/db-status");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

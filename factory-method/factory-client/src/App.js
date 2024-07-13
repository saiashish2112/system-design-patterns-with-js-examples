import React from "react";
import './styles.css';  // Import the CSS file
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";


function App() {
  return (
    <div className="App">
      <div className="container">
      <h1>Factory Method Design Pattern Example</h1>
      <UserForm />
      <UserList />
      </div>
    </div>
  );
}

export default App;

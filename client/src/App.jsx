import React from "react";
import EmailBuilder from "./components/EmailBuilder";
import "./styles/components.css";

function App() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Email Builder</h1>
      <EmailBuilder />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import Form from "./components/Form";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-indigo-500 text-white rounded">
          Expense Tracker
        </h1>

        {/* columns */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* chart */}
          <Graph />
          {/* form */}
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;

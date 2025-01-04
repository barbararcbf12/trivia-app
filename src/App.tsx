import React from "react";
import Header from "./components/Header/Header";
import QuestionsList from "./components/QuestionsList/QuestionsList";

function App() {
  return (
    <div className="space-y-3 h-screen flex flex-col items-center">
      <Header />
      <main className="p-3 w-1/2 flex justify-center">
        <QuestionsList />
      </main>
    </div>
  );
}

export default App;

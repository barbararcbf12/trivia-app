import React from "react";
import Header from "./components/Header/Header";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import { questions } from "./api/mockData";

function App() {
  return (
    <div className="space-y-3 h-screen flex flex-col items-center">
      <Header />
      <main className="p-3 w-1/2 flex justify-center">
        <QuestionsList questions={ questions }/>
      </main>
    </div>
  );
}

export default App;

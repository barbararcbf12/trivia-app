import React from "react";
import Header from "./components/Header/Header";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import { ReactQueryProvider } from "./api/react-query-provider";
import { QuestionsContextProvider } from "./context/QuestionsContext";

function App() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <ReactQueryProvider>
        <QuestionsContextProvider>
          <Header />
          <main className="w-full h-full flex flex-grow justify-center p-3 bg-mono-100">
            <QuestionsList />
          </main>
        </QuestionsContextProvider>
      </ReactQueryProvider>
    </div>
  );
}

export default App;

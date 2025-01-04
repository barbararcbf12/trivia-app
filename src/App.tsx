import React from "react";
import Header from "./components/Header/Header";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import { ReactQueryProvider } from "./api/react-query-provider";

function App() {
  return (
    <ReactQueryProvider>
      <div className="space-y-3 flex flex-col items-center">
        <Header />
        <main className="p-3 w-1/2 flex justify-center">
          <QuestionsList />
        </main>
      </div>
    </ReactQueryProvider>
  );
}

export default App;

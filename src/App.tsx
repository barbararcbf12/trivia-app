import React, { useState } from "react";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import Button from "./components/Button/Button";
import { getQuestions } from "./api/getQuestions";
import { AnswerProps } from "./types/answer";
import { useQuery } from "@tanstack/react-query";
import { ApiDataProps } from "./types/triviaApi";

function App() {
  const [ answers, setAnswers ] = useState<AnswerProps[]>([]);
  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>(false);
  const response = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });

  const handleReloadClick = () => {
    setIsFormSubmitted(false);
    setAnswers([]);
    response.refetch();
  }

  return (
    <div className="w-full h-full flex justify-center bg-mono-100" >
      <div className="w-full lg:w-3/4 h-full flex flex-col justify-center">
        <header
          className="bg-mono-100 w-full text-primary-900 flex justify-between items-center py-3 px-6 sticky z-100 top-0">
          <h1 className="text-32">Trivia</h1>
          <nav>
            <Button onClick={ handleReloadClick }>Reload</Button>
          </nav>
        </header>
        <main className="w-full h-full min-h-dvh flex flex-grow justify-center items-center p-3">
          <section className="flex flex-col gap-4 items-center w-full">
            <QuestionsList
              response={response}
              answers={answers}
              isFormSubmitted={isFormSubmitted}
              setIsFormSubmitted={setIsFormSubmitted}
              setAnswers={setAnswers}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

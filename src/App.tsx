import React from "react";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import Button from "./components/Button/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useGetQuestions } from "./hooks/useGetQuestions";

function App() {
  const methods = useForm();

  const { refetch: refetchQuestions } = useGetQuestions();

  const handleReloadClick = () => {
    methods.reset();
    refetchQuestions();
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
        <main className="w-full h-full min-h-dvh flex flex-grow justify-center items-start p-3">
          <FormProvider {...methods}>
            <section className="flex flex-col gap-4 items-center w-full">
              <QuestionsList />
            </section>
          </FormProvider>
        </main>
      </div>
    </div>
  );
}

export default App;

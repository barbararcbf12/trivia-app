import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { QueryProps } from "./types/queryOptions";
import Button from "./components/Button/Button";
import CustomiseTriviaForm from "./modules/CustomiseTriviaForm/CustomiseTriviaForm";
import QuestionsList from "./modules/QuestionsList/QuestionsList";
import { useGetQuestions } from "./hooks/useGetQuestions";
import { INITIAL_QUERY_VALUE } from "./constants/query";

function App() {
  const methods = useForm();
  const [ openCustomizationOptions, setOpenCustomizationOptions ] = useState<boolean>(false);
  const [ tempQuery, setTempQuery ] = useState<QueryProps>(INITIAL_QUERY_VALUE);
  const [ query, setQuery ] = useState<QueryProps>(INITIAL_QUERY_VALUE);

  const { refetch: refetchQuestions, isLoading: loadingQuestions } = useGetQuestions({ query });

  const handleReloadClick = () => {
    methods.reset();
    refetchQuestions();
  }

  const handleOpenCustomForm = () => {
    setOpenCustomizationOptions(true);
  }

  return (
    <div className="w-full h-full flex justify-center bg-mono-100" >
      <div className="w-full lg:w-3/4 h-full flex flex-col justify-center">
        <header className="bg-mono-100 w-full text-primary-900 flex flex-col justify-between items-center py-3 px-6 sticky z-100 top-0">
          <div className="flex justify-between w-full py-4">
            <h1 className="text-32">Trivia</h1>
            <nav className="flex gap-4 w-fuit">
              <Button onClick={ handleOpenCustomForm }>Customise your trivia!</Button>
              <Button disabled={ loadingQuestions } onClick={ handleReloadClick } variant = 'secondary' >Reload</Button>
            </nav>
          </div>
          {openCustomizationOptions ? (
            <CustomiseTriviaForm
              setQuery={ setQuery }
              setTempQuery={ setTempQuery }
              tempQuery={ tempQuery }
              setOpenCustomizationOptions={ setOpenCustomizationOptions }
            />
          ) : null }
        </header>
        <main className="w-full h-full min-h-dvh flex flex-grow justify-center items-center p-3">
          <FormProvider {...methods}>
            <section className="flex flex-col gap-4 items-center w-full">
              <QuestionsList query={query} />
            </section>
          </FormProvider>
        </main>
      </div>
    </div>
  );
}

export default App;

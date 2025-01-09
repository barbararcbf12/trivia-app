import React, { useEffect, useState } from "react";
import type { AnswerProps } from "./types/answer";
import type { ApiDataProps } from "./types/triviaApi";
import type { QueryProps } from "./types/queryOptions";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import Button from "./components/Button/Button";
import { getQuestions } from "./api/getQuestions";
import { useQuery } from "@tanstack/react-query";
import { INITIAL_QUERY_VALUE } from "./constants/query";
import { delayFunctionCall } from "./utils/delayFunctionCall";
import CustomiseTriviaForm from "./modules/CustomiseTriviaForm/CustomiseTriviaForm";

function App() {
  const [ answers, setAnswers ] = useState<AnswerProps[]>([]);
  const [ enabled, setEnabled ] = useState<boolean>(false);
  const [ openCustomizationOptions, setOpenCustomizationOptions ] = useState<boolean>(false);
  const [ tempQuery, setTempQuery ] = useState<QueryProps>(INITIAL_QUERY_VALUE);
  const [ query, setQuery ] = useState<QueryProps>(INITIAL_QUERY_VALUE);
  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>(false);

  const response = useQuery<ApiDataProps>({
    queryKey: ['triviaData', query],
    queryFn: () => getQuestions(query),
    enabled,
    retry: 3,
    retryDelay: 5000,
  });

  useEffect(() => {
    //Delay the first call to the api in 5 seconds to prevent "Exceeded Request Limit" error
    delayFunctionCall(() => setEnabled(true));
  }, []);

  const handleReloadClick = () => {
    setIsFormSubmitted(false);
    setAnswers([]);
    setEnabled(true);
    response.refetch();
  }

  const handleDelayedReloadClick = () => {
    setEnabled(false);
    delayFunctionCall(() => handleReloadClick());
  };

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
              <Button disabled={!enabled} onClick={ handleDelayedReloadClick } variant = 'secondary' >Reload</Button>
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
          <section className="flex flex-col gap-4 items-center w-full">
            <QuestionsList
              enabled={enabled}
              response={ response }
              answers={ answers }
              isFormSubmitted={ isFormSubmitted }
              setIsFormSubmitted={ setIsFormSubmitted }
              setAnswers={ setAnswers }
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/getQuestions";
import type { ApiDataProps } from "../types/trivia-api";
import type { AnswerProps } from "../types/answer";

type ContextType = {
  exceedRequestsNr: boolean,
  questions: ApiDataProps['results'],
  isLoading: boolean,
  isFetching: boolean,
  error: any,
  isSuccess: boolean,
  refetch: () => void,
  setEnabled: (enabled: boolean) => void,
  isFormSubmitted: boolean,
  setIsFormSubmitted: (option: boolean) => void,
  answers: AnswerProps[],
  setAnswers: (answers: AnswerProps[]) => void,
}

const initialContext: ContextType = {
  exceedRequestsNr: false,
  questions: [],
  isLoading: false,
  isFetching: false,
  error: null,
  isSuccess: false,
  refetch: () => {},
  setEnabled: () => {},
  isFormSubmitted: false,
  setIsFormSubmitted: () => {},
  answers: [],
  setAnswers: () => {},
};

const QuestionsContext = createContext(initialContext);

function QuestionsContextProvider({ children }: { children: any } ) {
  const [ answers, setAnswers ] = useState<AnswerProps[]>([]);
  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>(false);
  const [ enabled, setEnabled ] = useState<boolean>(true);
  const { isLoading, isFetching, error, data, isSuccess, refetch } = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
    enabled: enabled,
  });

  const value = {
    // 5 is the code for rate limit according to the API docs https://opentdb.com/api_config.php
    exceedRequestsNr: data?.response_code === 5,
    questions: data?.results || [],
    isLoading,
    isFetching,
    error,
    isSuccess,
    refetch,
    setEnabled,
    isFormSubmitted,
    setIsFormSubmitted,
    answers,
    setAnswers
  }

  return (
    <QuestionsContext.Provider value={ value }>
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsContextProvider");
  }
  return context;
}

export { QuestionsContextProvider, useQuestions };
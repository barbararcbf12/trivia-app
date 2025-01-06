import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../api/getQuestions";
import type { ApiDataProps } from "../types/trivia-api";
import type { AnswerProps } from "../types/answer";
import { hasExceededRequestLimit } from "../utils/hasExceededRequestLimit";

type ContextType = {
  exceedRequestsNr: boolean,
  questions: ApiDataProps['results'],
  isLoading: boolean,
  isFetching: boolean,
  error: any,
  refetch: () => void,
  isFormSubmitted: boolean,
  setIsFormSubmitted: (option: boolean) => void,
  answers: AnswerProps[],
  setAnswers: Dispatch<SetStateAction<AnswerProps[]>>
}

const initialContext: ContextType = {
  exceedRequestsNr: false,
  questions: [],
  isLoading: false,
  isFetching: false,
  error: null,
  refetch: () => {},
  isFormSubmitted: false,
  setIsFormSubmitted: () => {},
  answers: [],
  setAnswers: () => {},
};

const QuestionsContext = createContext(initialContext);

function QuestionsContextProvider({ children }: { children: ReactNode } ) {
  const [ answers, setAnswers ] = useState<AnswerProps[]>([]);
  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>(false);
  const { isLoading, isFetching, error, data, refetch } = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });

  const value = {
    exceedRequestsNr: hasExceededRequestLimit(data?.response_code),
    questions: data?.results || [],
    isLoading,
    isFetching,
    error,
    refetch,
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
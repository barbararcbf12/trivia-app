import { useQuery } from "@tanstack/react-query";
import { ApiDataProps } from "../types/triviaApi";
import { getQuestions } from "../api/getQuestions";

export function useGetQuestions(){
  const { data: questionsData, isLoading: loadingQuestions, isFetching: fetchingQuestions, error: errorQuestions, refetch: refetchQuestions } = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });

  return { questionsData, loadingQuestions, fetchingQuestions, errorQuestions, refetchQuestions };
}
import { useQuery } from "@tanstack/react-query";
import { ApiDataProps } from "../types/triviaApi";
import { getQuestions } from "../api/getQuestions";

export function useGetQuestions(){
  return useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });
}
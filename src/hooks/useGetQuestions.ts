import { useQuery } from "@tanstack/react-query";
import { ApiDataProps } from "../types/triviaApi";
import { getQuestions } from "../api/getQuestions";
import { QueryProps } from "../types/queryOptions";

type UseGetQuestionsProps = {
  query: QueryProps;
  enabled?: boolean;
}
export function useGetQuestions({ query, enabled }: UseGetQuestionsProps) {
  return useQuery<ApiDataProps>({
    queryKey: ['triviaData', query],
    queryFn: () => getQuestions(query),
    enabled,
    staleTime: 5000, // Prevent fetching for 5 seconds after the data is fetched
    retry: 3,
    retryDelay: 5000,
    refetchOnMount: false,
  });
}
import type { ApiDataProps } from "../types/triviaApi";
import { QueryProps } from "../types/queryOptions";

const QUESTIONS_API_URL = 'https://opentdb.com/api.php';

export const getQuestions: (query: QueryProps) => Promise<ApiDataProps> = async (query: QueryProps): Promise<ApiDataProps> => {
  let searchParams = new URLSearchParams();
  if (query) {
    (Object.keys(query) as (keyof QueryProps)[]).forEach((queryKey) => {
      const value = query[queryKey];
      if (value !== null && value !== undefined) {
        searchParams.set(queryKey, value.toString());
      }
    });
  }
  const response = await fetch(`${ QUESTIONS_API_URL }?${searchParams}`);
  return await response.json();
};

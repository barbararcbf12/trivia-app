import { useQuery } from "@tanstack/react-query";
import { ApiCategoriesProps } from "../types/triviaApi";
import { getCategories } from "../api/getCategories";

export function useGetCategories() {
  return useQuery<ApiCategoriesProps>({
    queryKey: ['questionCategories'],
    queryFn: getCategories,
  });
}
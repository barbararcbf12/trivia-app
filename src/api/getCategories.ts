import { ApiCategoriesProps } from "../types/triviaApi";

const CATEGORIES_API_URL = 'https://opentdb.com/api_category.php';

export const getCategories: () => Promise<ApiCategoriesProps> = async (): Promise<ApiCategoriesProps> => {
  const response = await fetch(CATEGORIES_API_URL);
  return await response.json();
}
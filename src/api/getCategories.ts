import { ApiCategoryProps } from "../types/triviaApi";

const CATEGORIES_API_URL = 'https://opentdb.com/api_category.php';

type ApiCategoriesProps = {
  trivia_categories: ApiCategoryProps[];
}

export const getCategories: () => Promise<ApiCategoriesProps> = async (): Promise<ApiCategoriesProps> => {
  const response = await fetch(CATEGORIES_API_URL);
  return await response.json();
}
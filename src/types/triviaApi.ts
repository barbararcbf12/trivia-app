export type ApiDataProps = {
  response_code: number;
  results: QuestionDataProps[];
}

export type TypeEnum = "multiple" | "boolean";
export type DifficultyEnum = "easy" | "medium" | "hard";

export type QuestionDataProps = {
  type: TypeEnum;
  difficulty: DifficultyEnum;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type ApiCategoryProps = {
  id: number;
  name: string;
}

export type ApiCategoriesProps = {
  trivia_categories: ApiCategoryProps[];
}
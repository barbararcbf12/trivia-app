export type ApiDataProps = {
  response_code: number;
  results: QuestionDataProps[];
}

export type TypeEnum = "multiple" | "boolean";
export type DifficultyEnum = "easy" | "medium" | "hard";

export type QuestionDataProps = {
  type: TypeEnum;
  difficulty?: DifficultyEnum;
  category?: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export type ApiDataProps = {
  response_code: number;
  results: QuestionDataProps[];
}

type TypeEnum = "multiple" | "boolean";
type DifficultyEnum = "easy" | "medium" | "hard";

export type QuestionDataProps = {
  type: TypeEnum;
  difficulty: DifficultyEnum;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
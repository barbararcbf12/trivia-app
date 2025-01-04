export type ApiDataProps = {
  response_code: number;
  results: QuestionDataProps[];
}

export type QuestionDataProps = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
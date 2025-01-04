import type { QuestionDataProps } from "../types/trivia-api";

export const questions: QuestionDataProps[] = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science &amp; Nature",
    question: "What is the unit of electrical capacitance?",
    correct_answer: "Farad",
    incorrect_answers: [
      "Gauss",
      "Henry",
      "Watt"
    ]
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science &amp; Nature",
    question: "Folic acid is the synthetic form of which vitamin?",
    correct_answer: "Vitamin B",
    incorrect_answers: [
      "Vitamin A",
      "Vitamin C",
      "Vitamin D"
    ]
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science &amp; Nature",
    question: "A plant that has a life cycle for more than a year is known as an annual.",
    correct_answer: "False",
    incorrect_answers: [
      "True"
    ]
  },
];
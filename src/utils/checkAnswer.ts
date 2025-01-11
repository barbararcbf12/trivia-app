export const isAnswerCorrect = (selectedAnswer: string, correct_answer: string, isBoolean: boolean) => {
  const convertedCorrectAnswer = isBoolean ? correct_answer === "False" ? "Incorrect" : "Correct" : correct_answer;
  return selectedAnswer === convertedCorrectAnswer;
}
export function checkAnswer(selectedAnswer: string, correct_answer: string) {
  if (selectedAnswer === correct_answer) {
    return true;
  }
  return false;
}
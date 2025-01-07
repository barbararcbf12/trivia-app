//If type is not boolean, correct and incorrect options are merged into one array and shuffle it
//otherwise, the options are fixed to 'True' and 'False' in this order
export function getOptions(type: string, correct_answer: string, incorrect_answers: string[]) {
  if (type === 'boolean') {
    return ['Correct', 'Incorrect'];
  }
  return [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);
}

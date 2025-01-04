const API_URL = 'https://opentdb.com/api.php?amount=10&category=17';

export const getQuestions = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

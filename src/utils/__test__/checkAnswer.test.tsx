import { isAnswerCorrect } from "../checkAnswer";

describe("isAnswerCorrect", () => {
  test("returns true for correct answer", () => {
    expect(isAnswerCorrect("Paris", "Paris")).toBe(true);
  });

  test("returns false for incorrect answer", () => {
    expect(isAnswerCorrect("Berlin", "Paris")).toBe(false);
  });
});

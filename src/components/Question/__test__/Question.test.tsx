import Question from "../Question";
import { render } from "@testing-library/react";
import { questions } from "../../../api/mockData";

test("should render <Question> without props", () => {
  render(
    <Question {...questions[0]} questionId='question-1' />);
});

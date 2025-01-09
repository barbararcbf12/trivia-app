import QuestionsList from "../QuestionsList";
import { render } from "@testing-library/react";

test("should render <QuestionsList> without props", () => {
  render(<QuestionsList />);
});

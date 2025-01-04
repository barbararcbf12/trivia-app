import QuestionsList from "../QuestionsList";
import { render } from "@testing-library/react";
import { questions } from "../../../api/mockData";

test("should render <QuestionsList> without props", () => {
  render(<QuestionsList />);
});

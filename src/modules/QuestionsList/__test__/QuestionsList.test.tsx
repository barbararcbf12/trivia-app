import QuestionsList from "../QuestionsList";
import { render } from "@testing-library/react";
import { INITIAL_QUERY_VALUE } from "../../../constants/query";

test("should render <QuestionsList> without props", () => {
  render(
    <QuestionsList
      query={INITIAL_QUERY_VALUE}
    />);
});

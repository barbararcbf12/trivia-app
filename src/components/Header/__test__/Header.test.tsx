import Header from "../Header";
import { render } from "@testing-library/react";

test("should render <Header> without props", () => {
  render(<Header />);
});

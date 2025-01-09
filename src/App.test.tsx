import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ReactQueryProvider } from "./api/react-query-provider";

test("render <App> component without props", () => {
  render(<ReactQueryProvider><App /></ReactQueryProvider>);
  const title = screen.getByText(/Trivia/i);
  expect(title).toBeInTheDocument();
});

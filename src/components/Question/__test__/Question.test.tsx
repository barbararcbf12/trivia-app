import { render, screen, fireEvent } from "@testing-library/react";
import Question from "../Question";
import type { TypeEnum } from "../../../types/triviaApi";
import { ReactQueryProvider } from "../../../api/react-query-provider";

const mockSetAnswers = jest.fn();

const questionProps = {
  type: "multiple" as TypeEnum,
  question: "What is the capital of France?",
  correct_answer: "Paris",
  incorrect_answers: ["London", "Berlin", "Madrid"],
  questionId: "question-1",
  isFormSubmitted: false,
  setAnswers: mockSetAnswers,
};

const ComponentWrapped = (props: any) =>
  <ReactQueryProvider>
    <Question {...props} />
  </ReactQueryProvider>

describe("Question Component", () => {
  test("renders the question text", () => {
    render(<ComponentWrapped {...questionProps} />);
    expect(screen.getByText(/what is the capital of france\?/i)).toBeInTheDocument();
  });

  test("renders the options", () => {
    render(<ComponentWrapped {...questionProps} />);
    const options = screen.getAllByRole("radio");
    expect(options).toHaveLength(4);
    expect(screen.getByLabelText(/paris/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/london/i)).toBeInTheDocument();
  });

  test("displays 'Incorrect' if the form is submitted and the answer is wrong", () => {
    render(<ComponentWrapped {...questionProps} isFormSubmitted={true}/>);
    const berlinOption = screen.getByLabelText(/berlin/i);
    fireEvent.click(berlinOption);
    expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
  });
});

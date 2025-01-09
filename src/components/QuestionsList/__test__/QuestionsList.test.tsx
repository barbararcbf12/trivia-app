import QuestionsList from "../QuestionsList";
import { render } from "@testing-library/react";

test("should render <QuestionsList> without props", () => {
  render(
    <QuestionsList
      answers={[]}
      setAnswers={() => {}}
      isFormSubmitted={false}
      setIsFormSubmitted={() => {}}
    />);
});



/*import { render, screen, fireEvent } from "@testing-library/react";
import QuestionsList from "../QuestionsList";
import { UseQueryResult } from "@tanstack/react-query";
import { ApiDataProps, TypeEnum } from "../../../types/triviaApi";


const mockSetAnswers = jest.fn();
const mockSetIsFormSubmitted = jest.fn();

export const responseMock = (state: Partial<UseQueryResult<ApiDataProps, Error>>): UseQueryResult<ApiDataProps, Error> => {
  return state ? {
    data: {
      results: [
        {
          question: "What is 2+2?",
          correct_answer: "4",
          incorrect_answers: ["3", "5", "6"],
          type: "multiple" as TypeEnum,
        },
      ],
      response_code: 0,
    },
    error: null,
    isLoading: false,
    isFetching: false,
    isError: false,
    isSuccess: false,
    refetch: jest.fn(),
    ...state, // Override with the specific state you want to test
  } : undefined;
};

/!*const responseMock = {
  isLoading: false,
  isFetching: false,
  data: {
    results: [
      { question: "What is 2+2?", correct_answer: "4", incorrect_answers: ["3", "5", "6"], type: "multiple" },
    ],
    response_code: 0,
  },
};*!/

describe("QuestionsList Component", () => {
  test("renders loader when loading", () => {
    render(
      <QuestionsList
        response={{ ...responseMock, isLoading: true }}
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );
    expect(screen.getByText(/loader/i)).toBeInTheDocument();
  });

  test("renders questions when loaded", () => {
    render(
      <QuestionsList
        response={responseMock}
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );
    expect(screen.getByText(/what is 2\+2\?/i)).toBeInTheDocument();
  });

  test("disables the submit button until all questions are answered", () => {
    render(
      <QuestionsList
        response={responseMock}
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("triggers form submission when the submit button is clicked", () => {
    render(
      <QuestionsList
        response={responseMock}
        answers={[{ questionId: "1", answer: "4", isCorrect: true }]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(mockSetIsFormSubmitted).toHaveBeenCalledWith(true);
  });
});*/


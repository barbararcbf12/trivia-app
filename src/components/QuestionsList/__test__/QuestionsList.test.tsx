import { render, screen } from "@testing-library/react";
import { AnswerProps } from "../../../types/answer";
import { useGetQuestions } from "../../../hooks/useGetQuestions";
import QuestionsList from "../QuestionsList";


jest.mock("../../../hooks/useGetQuestions");

const mockSetAnswers = jest.fn();
const mockSetIsFormSubmitted = jest.fn();

describe("QuestionsList Component", () => {
  const mockAnswers: AnswerProps[] = [
    { questionId: "question-1", answer: "4", isCorrect: true },
    { questionId: "question-2", answer: "Paris", isCorrect: false },
  ];

  const mockQuestions = [
    { question: "What is 2+2?", correct_answer: "4", incorrect_answers: ["3", "5", "6"], type: "multiple" },
    { question: "What is the capital of France?", correct_answer: "Paris", incorrect_answers: ["Berlin", "London", "Madrid"], type: "multiple" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loader when data is loading", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      error: null,
      data: null,
    });

    render(
      <QuestionsList
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByTestId(/loader/i)).toBeInTheDocument();
  });

  test("renders error message when an error occurs", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: { message: "Failed to fetch questions" },
      data: null,
    });

    render(
      <QuestionsList
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByText(/an error has occurred: failed to fetch questions/i)).toBeInTheDocument();
  });

  test("renders rate limit message when request limit is exceeded", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: { response_code: 5, results: [] }, // 5 indicates rate limit exceeded
    });

    render(
      <QuestionsList
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByText(/too many requests have occurred/i)).toBeInTheDocument();
  });

  test("renders questions and submit button when data is loaded", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: { response_code: 0, results: mockQuestions },
    });

    render(
      <QuestionsList
        answers={[]}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByText(/what is 2\+2\?/i)).toBeInTheDocument();
    expect(screen.getByText(/what is the capital of france\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled(); // Form should be disabled until all questions are answered
  });

  test("enables submit button when all questions are answered", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: { response_code: 0, results: mockQuestions },
    });

    render(
      <QuestionsList
        answers={mockAnswers}
        setAnswers={mockSetAnswers}
        isFormSubmitted={false}
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByRole("button", { name: /submit/i })).not.toBeDisabled();
  });

  test("shows correct answer count after form submission", () => {
    (useGetQuestions as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: { response_code: 0, results: mockQuestions },
    });

    render(
      <QuestionsList
        answers={mockAnswers}
        setAnswers={mockSetAnswers}
        isFormSubmitted={true} // Simulate form submission
        setIsFormSubmitted={mockSetIsFormSubmitted}
      />
    );

    expect(screen.getByText(/1 \/ 10 correct/i)).toBeInTheDocument(); // Shows correct count (1 out of 10 questions)
  });

});

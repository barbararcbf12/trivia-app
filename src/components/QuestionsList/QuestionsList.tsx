import React, { Dispatch, FormEvent, SetStateAction, useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { ApiDataProps } from "../../types/triviaApi";
import { UseQueryResult } from "@tanstack/react-query";
import { AnswerProps } from "../../types/answer";
import { hasExceededRequestLimit } from "../../utils/hasExceededRequestLimit";

type QuestionDataProps = {
  response?:  UseQueryResult<ApiDataProps, Error>,
  answers: AnswerProps[],
  setAnswers: Dispatch<SetStateAction<AnswerProps[]>>,
  isFormSubmitted: boolean,
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>
  enabled: boolean,
}

function QuestionsList(props: QuestionDataProps) {
  const {
    response,
    isFormSubmitted,
    setIsFormSubmitted,
    answers,
    setAnswers,
    enabled
  } = props;

  const { isLoading, isFetching, error, data } = response ?? {};

  const questions = data?.results || [];
  const exceedRequestsNr = hasExceededRequestLimit(data?.response_code);

  function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsFormSubmitted(true);
  }

  const countCorrectAnswers = useMemo(() => answers.filter(answer => answer.isCorrect).length, [answers]);
  const isFormFilled = answers.length === questions.length;
  const errorMessage = error?.message || "Something went wrong. Please try again.";

  if (isLoading || isFetching || !enabled) return <span className="loader"></span>;
  if (exceedRequestsNr) return <span>Too many requests have occurred. Wait 5 seconds and try again.</span>;
  if (error) return <span>{`An error has occurred: ${errorMessage}`}</span>;

  return (
    <>
      <form
        onSubmit={ onHandleSubmit }
        className="w-full flex flex-col space-y-4"
      >
        { questions?.map((question, index) =>
          <Question
            key={ question.question }
            questionId={ `question-${ index + 1 }` }
            { ...question }
            isFormSubmitted={isFormSubmitted}
            setAnswers={setAnswers}
          />
        ) }
        <Button disabled={ !isFormFilled }>Submit</Button>
      </form>
      <span className="text-red-600 pb-6 mb-6">{ isFormSubmitted ? `${ countCorrectAnswers } / 10 correct` : ''}</span>
    </>
  );
}

export default QuestionsList;
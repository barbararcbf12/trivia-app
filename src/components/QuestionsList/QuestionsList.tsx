import React, { Dispatch, FormEvent, SetStateAction, useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { UseQueryResult } from "@tanstack/react-query";
import type { ApiDataProps } from "../../types/triviaApi";
import type { AnswerProps } from "../../types/answer";
import { hasExceededRequestLimit } from "../../utils/hasExceededRequestLimit";
import { Skeleton } from "@mui/material";

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

  const loading = isLoading || isFetching || !enabled;

  if (exceedRequestsNr) return <span>Too many requests have occurred. Wait 5 seconds and try again.</span>;
  if (error) return <span>{`An error has occurred: ${errorMessage}`}</span>;
  if (data?.results.length === 0) return <span>There are no questions for the selected options you made</span>;

  return (
    <>
      <form
        onSubmit={ onHandleSubmit }
        className="w-full flex flex-col space-y-4"
      >
        {loading ? [ ...Array(5) ].map((_, i) => (
          <QuestionSkeleton key={`question-skeleton-${i}`}/>
         )) : questions?.map((question, index) =>
          <Question
            key={ question.question }
            questionId={ `question-${ index + 1 }` }
            { ...question }
            isFormSubmitted={isFormSubmitted}
            setAnswers={setAnswers}
          />
        ) }
        <QuestionSkeleton/>
        <Button disabled={ !isFormFilled }>Submit</Button>
      </form>
      <span className="text-red-600 pb-6 mb-6">{ isFormSubmitted ? `${ countCorrectAnswers } / 10 correct` : ''}</span>
    </>
  );
}

export default QuestionsList;

const QuestionSkeleton = () => {
  return (
    <div className='flex flex-col space-y-2 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full'>
      <div className="flex flex-col space-y-4">
        <Skeleton sx={ { height: 20, width: "80%" } } animation="wave" variant="rectangular"/>
        <ul className="w-full flex flex-col gap-2.5">
          { [ ...Array(5) ].map((_, i) => (
            <li className="flex" key={ `option-skeleton-${ i }` }>
              <span className="flex gap-2 items-center w-full">
                <Skeleton sx={ {height: 20, width: 20} } animation="wave" variant="circular"/>
                <Skeleton sx={ {height: 20, width: `${20 - i}%`} } animation="wave" variant="rectangular"/>
              </span>
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
}
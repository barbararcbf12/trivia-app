import React, { useState } from "react";
import Question from "../Question/Question";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../api/getQuestions";
import type { ApiDataProps } from "../../types/trivia-api";
import type { AnswerProps } from "../../types/answer";

function QuestionsList() {
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false);
  const [ answers, setAnswers ] = useState<AnswerProps[]>([]);

  const { isLoading, error, data, isSuccess } = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });

  function onHandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  const countCorrectAnswers = answers.filter(answer => answer.isCorrect).length;

  return (
    <section className="flex flex-col gap-4 items-center w-1/2">
      { isLoading ? <span className="loader"></span> : null }
      { error ? <span>{ `An error has occurred: ${ error.message }` }</span> : null }
      { isSuccess ?
        <>
          <form
            onSubmit={ onHandleSubmit }
            className="w-full flex flex-col space-y-4"
          >
            { data?.results?.map((question, index) =>
              <Question
                key={ question.question }
                questionId={ `question-${ index + 1 }` }
                answers={ answers }
                handleSelect={ setAnswers }
                isFormSubmitted={ isSubmitted }
                { ...question }
              />
            ) }
            <button
              className="w-fit bg-grey-300 py-2 px-4 rounded-minimal text-white"
            >
              Submit
            </button>
          </form>
          { isSubmitted ? <span className="text-red-600">{ `${countCorrectAnswers} / 10 correct` }</span> : null }
        </>
      : null }
    </section>
  );
}

export default QuestionsList;
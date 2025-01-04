import React, { useState } from "react";
import Question from "../Question/Question";
import { useQuery } from "@tanstack/react-query";
import { ApiDataProps } from "../../types/trivia-api";
import { getQuestions } from "../../api/getQuestions";

function QuestionsList() {
  const [ isSubmitted, setIsSubmitted ] = useState<boolean>(false);

  const { isLoading, error, data, isSuccess } = useQuery<ApiDataProps>({
    queryKey: ['triviaData'],
    queryFn: getQuestions,
  });

  return (
    <section className="flex flex-col gap-4">
      { isLoading ? <span>'Loading...'</span> : null }
      { error ?
        <span>{ `An error has occurred: ${ error.message }` }</span>
        : null
      }
      {isSuccess ?
        <>
          <form
            action="/"
            className="w-full flex flex-col space-y-4"
          >
            { data?.results?.map((question, index) =>
              <Question key={ question.question } { ...question } questionId={ `question-${ index + 1 }` }/>
            ) }
            <button
              className="w-fit bg-grey-300 py-2 px-4 rounded-minimal text-white"
            >
              Submit
            </button>
          </form>
          { isSubmitted ? <span className="text-red-600">2/10 correct</span> : null }
        </>
      : null }
    </section>
  );
}

export default QuestionsList;
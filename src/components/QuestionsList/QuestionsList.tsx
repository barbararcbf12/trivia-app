import React, { useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { hasExceededRequestLimit } from "../../utils/hasExceededRequestLimit";
import { useFormContext } from "react-hook-form";
import { useGetQuestions } from "../../hooks/useGetQuestions";
import { QuestionDataProps } from "../../types/triviaApi";

function QuestionsList() {
  const { handleSubmit, formState } = useFormContext();

  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isFetching: fetchingQuestions,
    error: errorQuestions
  } = useGetQuestions();

  const questions: QuestionDataProps[] = useMemo(() => questionsData?.results, [questionsData]) || [];
  const exceedRequestsNr = hasExceededRequestLimit(questionsData?.response_code);
  const errorMessage = errorQuestions?.message || "Something went wrong. Please try again.";
  const countCorrectAnswers = useMemo(() => (questions.length - Object.keys(formState.errors).length), [questions, formState.errors]);

  function onSubmit(data: any) {}

  if (loadingQuestions || fetchingQuestions) return <span className="loader"></span>;
  if (exceedRequestsNr) return <span>Too many requests have occurred. Wait 5 seconds and try again.</span>;
  if (errorQuestions) return <span>{`An error has occurred: ${errorMessage}`}</span>;

  return (
    <>
      <form
        onSubmit={ handleSubmit(onSubmit) }
        className="w-full flex flex-col space-y-4"
      >
        { questions?.map((question, index) =>
          <Question
            key={ question.question }
            questionId={ `question-${ index + 1 }` }
            { ...question }
          />
        ) }
        {/*<Button disabled={ !isFormFilled }>Submit</Button>*/}
        <Button>Submit</Button>
      </form>
      <span className="text-red-600 pb-6 mb-6">{ formState.isSubmitted ? `${ countCorrectAnswers } / ${ questions.length } correct` : ''}</span>
    </>
  );
}

export default QuestionsList;
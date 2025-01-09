import React, { useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { hasExceededRequestLimit } from "../../utils/hasExceededRequestLimit";
import { useFormContext } from "react-hook-form";
import { useGetQuestions } from "../../hooks/useGetQuestions";
import { QuestionDataProps } from "../../types/triviaApi";

function QuestionsList() {
  const { handleSubmit, formState, watch } = useFormContext();

  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isFetching: fetchingQuestions,
    error: errorQuestions
  } = useGetQuestions();

  const questions: QuestionDataProps[] = useMemo(() => questionsData?.results, [questionsData]) || [];
  const exceedRequestsNr = hasExceededRequestLimit(questionsData?.response_code);
  const errorMessage = errorQuestions?.message || "Something went wrong. Please try again.";

  // Watch all the form values
  const formValues = watch();

  // Check if all questions have been answered
  const allQuestionsAnswered = useMemo(() => {
    return (
      questions.length > 0 &&
      questions.every((_, index) => {
        const questionId = `question-${index + 1}`;
        return formValues[questionId];
      })
    );
  }, [formValues, questions]);


  function onSubmit() {}

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
        <Button disabled={!allQuestionsAnswered}>Submit</Button>
      </form>
      <span className="text-red-600 pb-6 mb-6">{ formState.isSubmitted ? `${questions.length - Object.keys(formState.errors).length} / ${ questions.length } correct` : ''}</span>
    </>
  );
}

export default QuestionsList;
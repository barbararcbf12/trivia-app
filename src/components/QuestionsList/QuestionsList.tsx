import React, { useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { hasExceededRequestLimit } from "../../utils/hasExceededRequestLimit";
import { useFormContext } from "react-hook-form";
import { useGetQuestions } from "../../hooks/useGetQuestions";
import { QuestionDataProps } from "../../types/triviaApi";
import { Skeleton } from "@mui/material";

function QuestionsList() {
  const { handleSubmit, formState, watch } = useFormContext();

  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isFetching: fetchingQuestions,
    error: errorQuestions
  } = useGetQuestions();

  const questions: QuestionDataProps[] = useMemo(() => questionsData?.results || [], [questionsData]);
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

  const loading = loadingQuestions || fetchingQuestions;

  if (exceedRequestsNr) return <span>Too many requests have occurred. Wait 5 seconds and try again.</span>;
  if (errorQuestions) return <span>{`An error has occurred: ${errorMessage}`}</span>;
  if (!loading && questions.length === 0) return <span>There are no questions for the selected options you made</span>;

  return (
    <>
      <form
        onSubmit={ handleSubmit(onSubmit) }
        className="w-full flex flex-col space-y-4"
      >
        {loading ? [ ...Array(5) ].map((_, i) => (
          <QuestionSkeleton key={`question-skeleton-${i}`}/>
        )) : questions?.map((question, index) =>
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
import React, { FormEvent, useMemo } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { useQuestions } from "../../context/QuestionsContext";

function QuestionsList() {
  const {
    exceedRequestsNr,
    questions,
    isLoading,
    isFetching,
    error,
    isFormSubmitted,
    setIsFormSubmitted,
    answers,
  } = useQuestions();

  function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsFormSubmitted(true);
  }

  const countCorrectAnswers = useMemo(() => answers.filter(answer => answer.isCorrect).length, [answers]);
  const isFormFilled = answers.length === questions.length;
  const errorMessage = error?.message || "Something went wrong. Please try again.";

  if (isLoading || isFetching) return <span className="loader"></span>;
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
          />
        ) }
        <Button disabled={ !isFormFilled }>Submit</Button>
      </form>
      <span className="text-red-600 pb-6 mb-6">{ isFormSubmitted ? `${ countCorrectAnswers } / 10 correct` : ''}</span>
    </>
  );
}

export default QuestionsList;
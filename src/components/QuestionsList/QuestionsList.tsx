import React, { FormEvent } from "react";
import Question from "../Question/Question";
import Button from "../Button/Button";
import { useQuestions } from "../../context/QuestionsContext";

function QuestionsList() {
  const {
    questions,
    isLoading,
    isFetching,
    error,
    isSuccess,
    setEnabled,
    isFormSubmitted,
    setIsFormSubmitted,
    answers,
  } = useQuestions();

  function onHandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsFormSubmitted(true);
    setEnabled(false);
  }

  const countCorrectAnswers = answers.filter(answer => answer.isCorrect).length;
  const isFormFilled = answers.length === questions.length;

  return (
    <section className="flex flex-col gap-4 items-center w-1/2">
      { isLoading || isFetching ? <span className="loader"></span> : null }
      { error ? <span>{ `An error has occurred: ${ error.message }` }</span> : null }
      { !isLoading && !error && !isFetching && isSuccess ?
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
      : null }
    </section>
  );
}

export default QuestionsList;
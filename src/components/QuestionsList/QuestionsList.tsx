import React from "react";
import Question from "../Question/Question";
import { questions } from "../../api/mockData";

function QuestionsList() {
  const isSubmitted = true;

  return (
    <section className="flex flex-col gap-4">
      <form
        action="/"
        className="w-full flex flex-col space-y-4"
      >
        {questions.map((question, index) =>
          <Question key={question.question} {...question} questionId={`question-${index + 1}`} />
        )}
        <button
          className="w-fit bg-grey-300 py-2 px-4 rounded-minimal text-white"
          //disabled={}
        >
          Submit
        </button>
      </form>
      { isSubmitted ? <span className="text-red-600">2/10 correct</span> : null }
    </section>
  );
}

export default QuestionsList;
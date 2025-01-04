import React, { useMemo, useState } from "react";
import type { QuestionDataProps } from "../../types/trivia-api";
import type { AnswerProps } from "../../types/answer";
import { checkAnswer } from "../../utils/checkAnswer";

type QuestionProps = QuestionDataProps & {
  questionId: string,
  handleSelect: (answers: AnswerProps[]) => void,
  answers: AnswerProps[],
  isFormSubmitted: boolean,
};

function Question( props : QuestionProps ) {
  const [ selectedAnswer, setSelectedAnswer ] = useState<AnswerProps>();
  const {
    type,
    question,
    correct_answer,
    incorrect_answers,
    questionId,
    handleSelect,
    answers,
    isFormSubmitted
  } = props;

  const isQuestionBoolean = type === "boolean";
  //Merge correct and incorrect options into one array and shuffle it
  const options = useMemo(() => [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5), [correct_answer, incorrect_answers]);
  const showError = isFormSubmitted && selectedAnswer?.isCorrect === false;

  const handleSelection = (selectedOption: string) => {
    //Compose the selected answer object
    const selectedAnswer = { questionId, answer: selectedOption, isCorrect: checkAnswer(selectedOption, correct_answer) };
    setSelectedAnswer(selectedAnswer);
    //Remove the previous answer for the same question
    const filteredAnswers = answers?.filter(answer => answer.questionId !== questionId) || [];
    //Update the answers array with the selected answer
    handleSelect && handleSelect([...filteredAnswers, selectedAnswer]);
  }

  return (
    <div className="flex flex-col gap-4 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full">
      <h2>{ question }</h2>
      <fieldset id={ questionId }>
        <ul className={ `flex ${ isQuestionBoolean ? "gap-4" : "flex-col gap-2" }` }>
          {options.map((option, index) =>
            <li className="flex" key={`${ questionId }-option-${ index }`}>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  id={ `${ question }-option${ index }` }
                  name={ questionId }
                  value={ option }
                  onChange={ e => handleSelection(e.target.value) }
                />
                { option }
              </label>
            </li>
          )}
        </ul>
      </fieldset>
      { showError ? <span className="text-red-600">Incorrect</span> : null }
    </div>
  );
}

export default Question;
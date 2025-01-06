import React, { useMemo, useState } from "react";
import type { QuestionDataProps } from "../../types/trivia-api";
import type { AnswerProps } from "../../types/answer";
import { isAnswerCorrect } from "../../utils/checkAnswer";
import { useQuestions } from "../../context/QuestionsContext";
import { shuffleOptions } from "../../utils/shuffleOptions";

type QuestionProps = QuestionDataProps & {
  questionId: string,
};

function Question( props : QuestionProps ) {
  const [ selectedAnswer, setSelectedAnswer ] = useState<AnswerProps>();
  const { isFormSubmitted, setAnswers } = useQuestions();
  const {
    type,
    question,
    correct_answer,
    incorrect_answers,
    questionId,
  } = props;

  const isQuestionBoolean = type === "boolean";

  //If type is not boolean, correct and incorrect options are merged into one array and shuffle it
  //otherwise, the options are fixed to 'True' and 'False' in this order
  const options = useMemo(() =>
    isQuestionBoolean ? ['Correct', 'Incorrect'] : shuffleOptions([correct_answer, ...incorrect_answers]),
    [correct_answer, incorrect_answers, isQuestionBoolean]
  );
  const showError = useMemo(() => isFormSubmitted && selectedAnswer?.isCorrect === false, [isFormSubmitted, selectedAnswer]);

  const handleSelection = (selectedOption: string) => {
    //Compose the selected answer object
    const newAnswer = {
      questionId,
      answer: selectedOption,
      isCorrect: isAnswerCorrect(selectedOption, correct_answer)
    };
    setSelectedAnswer(newAnswer);
    //Remove the previous answer for the same question & Update it the answers array with the new answer
    setAnswers(prevState => [...prevState.filter(answer => answer.questionId !== questionId), newAnswer]);
  }

  return (
    <div className="flex flex-col gap-4 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full">
      <fieldset id={ questionId }>
        <legend>{ question }</legend>
        <ul className={ `flex ${ isQuestionBoolean ? "gap-4" : "flex-col gap-2" }` }>
          {options.map((option, index) => {
            const isIncorrect = !isAnswerCorrect(option, correct_answer) && selectedAnswer?.answer === option;
            return (
              <li className="flex" key={ `${ questionId }-option-${ index }` }>
                <label
                  className={ `flex gap-2 items-center ${ isFormSubmitted ? isIncorrect ? 'text-red-600' : 'text-grey-200' : '' }` }>
                  <input
                    type="radio"
                    id={ `${ question }-option${ index }` }
                    name={ questionId }
                    value={ option }
                    onChange={ e => handleSelection(e.target.value) }
                    disabled={ isFormSubmitted }
                  />
                  { option }
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
      { showError ? <span className="text-red-600">Incorrect</span> : null }
    </div>
  );
}

export default Question;
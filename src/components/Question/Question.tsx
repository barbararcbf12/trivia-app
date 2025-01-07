import React, { useMemo, useState } from "react";
import type { QuestionDataProps } from "../../types/triviaApi";
import type { AnswerProps } from "../../types/answer";
import { isAnswerCorrect } from "../../utils/checkAnswer";
import { getOptions } from "../../utils/getOptions";

type QuestionProps = QuestionDataProps & {
  questionId: string,
  setAnswers: (value: React.SetStateAction<AnswerProps[]>) => void,
  isFormSubmitted: boolean
};

function Question( props : QuestionProps ) {
  const [ selectedAnswer, setSelectedAnswer ] = useState<AnswerProps>();
  const { type, question, correct_answer, incorrect_answers, questionId, isFormSubmitted, setAnswers } = props;

  const isQuestionBoolean = useMemo( () => type === "boolean", [type]);

  const options = useMemo(() => getOptions(type, correct_answer, incorrect_answers),
    [correct_answer, incorrect_answers, type]
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
    <div className='flex flex-col space-y-2 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full' >
      <fieldset id={ questionId } className="flex flex-col space-y-4">
        <legend className="w-full">{ question }</legend>
        <ul className={ `w-full flex ${ isQuestionBoolean ? "gap-4" : "flex-col gap-2" }` }>
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
      <div className="text-red-600 block">{ showError ? 'Incorrect' : '' }</div>
    </div>
  );
}

export default Question;
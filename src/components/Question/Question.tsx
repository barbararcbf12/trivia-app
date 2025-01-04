import React from "react";
import { QuestionDataProps } from "../../types/question";

type QuestionProps = QuestionDataProps & { questionId: string };

function Question( props : QuestionProps ) {
  const { type, question, correct_answer, incorrect_answers, questionId } = props;
  const isBoolean = type === "boolean";
  const isIncorrect = true;
  const options = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col gap-4 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full">
      <h2>{ question }</h2>
      <fieldset id={ questionId }>
        <ul className={ `flex ${ isBoolean ? "gap-4" : "flex-col gap-2" }` }>
          {options.map((option, index) =>
            <li className="flex" key={`${questionId}-option-${index}`}>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  id={ `${ question }-option${ index }` }
                  name={ questionId }
                  value={ option }
                />
                { option }
              </label>
            </li>
          )}
        </ul>
      </fieldset>
      { isIncorrect ? <span className="text-red-600">Incorrect</span> : null }
    </div>
  );
}

export default Question;
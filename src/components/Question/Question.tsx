import React, { useMemo } from "react";
import type { QuestionDataProps } from "../../types/triviaApi";
import { isAnswerCorrect } from "../../utils/checkAnswer";
import { getOptions } from "../../utils/getOptions";
import { useFormContext } from "react-hook-form";

type QuestionProps = QuestionDataProps & {
  questionId: string,
};

function Question( props : QuestionProps ) {
  const { type, question, correct_answer, incorrect_answers, questionId } = props;

  const { register, formState, getValues } = useFormContext();
  const { errors, isSubmitted } = formState;
  const selectedAnswer = getValues()[questionId];

  const isQuestionTypeBoolean = useMemo( () => type === "boolean", [type]);

  const options = useMemo(() => getOptions(type, correct_answer, incorrect_answers),
    [correct_answer, incorrect_answers, type]
  );

  return (
    <div
      className='flex flex-col space-y-2 rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-elevation-01 w-full'>
      <fieldset id={ questionId } className="flex flex-col space-y-4">
        <legend className="w-full">{ question }</legend>
        <ul className={ `w-full flex ${ isQuestionTypeBoolean ? "gap-4" : "flex-col gap-2" }` }>
          { options.map((option, index) => {
            const highlightOption = isSubmitted && selectedAnswer === option && !isAnswerCorrect(selectedAnswer, correct_answer, isQuestionTypeBoolean);
            return (
              <li className="flex" key={ `${ questionId }-option-${ index }` }>
                <label
                  className={ `flex gap-2 items-center ${ highlightOption ? 'text-red-600' : '' }` }>
                  <input
                    {...register(questionId, {
                      validate: (value) =>
                        isAnswerCorrect(value, correct_answer, isQuestionTypeBoolean) ||
                        "Incorrect"
                    })}
                    type="radio"
                    id={ `${ question }-option${ index }` }
                    value={ option }
                    disabled={ isSubmitted }
                  />
                  { option }
                </label>
              </li>
            )
          })}
        </ul>
      </fieldset>
      <div
        className="text-red-600 block">{ isSubmitted && errors?.[questionId]?.message === 'Incorrect' ? 'Incorrect' : '' }</div>
    </div>
  );
}

export default Question;
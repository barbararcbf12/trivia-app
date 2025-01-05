import React from "react";
import Button from "../Button/Button";
import { useQuestions } from "../../context/QuestionsContext";

function Header() {

  const { refetch, setAnswers, setIsFormSubmitted } = useQuestions();

  const onHandleClick = () => {
    setIsFormSubmitted(false);
    setAnswers([]);
    refetch();
  }

  return (
    <header className="bg-grey-100 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6 sticky z-100 top-0">
      <h1 className="text-32">Trivia</h1>
      <nav>
        <Button onClick={ onHandleClick }>Reload</Button>
      </nav>
    </header>
  );
}

export default Header;

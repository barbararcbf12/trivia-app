import React from "react";

function Header() {
  return (
    <header className="bg-grey-100 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6 sticky z-100 top-0">
      <h1 className="text-20">Trivia</h1>
      <nav>
        <button className="w-fit bg-grey-300 p-2 rounded-minimal text-white">
          Reload
        </button>
      </nav>
    </header>
  );
}

export default Header;

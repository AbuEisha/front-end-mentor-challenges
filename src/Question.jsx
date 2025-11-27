import { useState } from "react";
import plusIcon from "./assets/images/icon-plus.svg";
import minusIcon from "./assets/images/icon-minus.svg";
export default function Question({ question, answer, isFirst }) {
  const [isOpen, setIsOpen] = useState(isFirst);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  return (
    <details open={isOpen}>
      <summary onClick={handleToggle}>
        <h3>{question}</h3>
        <img
          src={isOpen ? minusIcon : plusIcon}
          alt={isOpen ? "Minus Icon" : "Plus Icon"}
        />
      </summary>
      <div className="answer">
        <p>{answer}</p>
      </div>
    </details>
  );
}

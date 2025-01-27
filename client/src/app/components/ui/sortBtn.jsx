import React, { useState } from "react";
import "../../styles/ui/sortBtn.scss";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

const SortBtn = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (type) => {
    onSort(type);
    setIsOpen(false);
  };
  return (
    <div className="sort-button-container">
      <button className="sort-button" onClick={() => setIsOpen(!isOpen)}>
        {!isOpen ? <IoIosArrowRoundDown /> : <IoIosArrowRoundUp />}Сортировка
      </button>
      {isOpen && (
        <div className="sort-options">
          <button onClick={() => handleSort("Standard")}>Standard</button>
          <button onClick={() => handleSort("Standard+")}>Standard+</button>
          <button onClick={() => handleSort("Lux")}>Lux</button>
        </div>
      )}
    </div>
  );
};

export default SortBtn;

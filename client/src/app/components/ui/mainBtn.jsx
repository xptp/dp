import React from "react";
import "../../styles/ui/mainBtn.scss";

const MainBtn = ({ handle }) => {
  return handle ? (
    <button onClick={handle} className="main-btn">
      Забронировать
    </button>
  ) : (
    <button className="main-btn">Забронировать</button>
  );
};

export default MainBtn;

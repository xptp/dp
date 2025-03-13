import React from "react";
import "../../styles/ui/mainBtn.scss";

const MainBtn = ({ handle, text }) => {
  return handle ? (
    <button onClick={handle} className="main-btn">
      {text}
    </button>
  ) : (
    <button className="main-btn">{text}</button>
  );
};

export default MainBtn;

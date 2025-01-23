import React from "react";
import {useNavigate} from "react-router-dom";

function BackButton() {

  const nav = useNavigate();

  return (
    <div>
      <button className={"App-button"} onClick={() => nav(-1)}>
        Back
      </button>
    </div>
  )
}

export default BackButton;

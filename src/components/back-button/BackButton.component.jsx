import React from "react";
import {useNavigate} from "react-router-dom";

//This is a custom react component that is used to navigate back to the previous page. KR
//It uses the useNavigate hook from react-router-dom to navigate back to the previous page. KR
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

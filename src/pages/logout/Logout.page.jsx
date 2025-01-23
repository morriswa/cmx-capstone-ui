import {useNavigate} from "react-router-dom";

function Logout() {
  const router = useNavigate();
  return (
    <div className="flex-child justify-content-center align-items-center">
      <div className="flex-col mx-auto">
        <h1>Successfully logged out!</h1>
        <br/>
        <button
          className={"App-button"}
          onClick={() => router('/')}>Home</button>
      </div>
    </div>
  )
}

export default Logout;

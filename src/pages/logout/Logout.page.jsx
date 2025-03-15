import {useNavigate} from "react-router-dom";

function Logout() {
  const router = useNavigate(); //React router hook to navigate between pages
  //Returns the logout page with a message and a home button
  return (
    <div className="flex-child justify-content-center align-items-center">
      <div className="flex-col mx-auto">
        <h1>Successfully logged out!</h1> {/*Logout message*/}
        <br/>
        <button
          className={"App-button"} //Button styling
          onClick={() => router('/')}>Home</button> {/*Button to navigate to home page*/}
      </div>
    </div>
  )
}

export default Logout; //Export the Logout component

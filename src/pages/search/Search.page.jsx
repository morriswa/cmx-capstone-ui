import './Search.page.scss';
import {useState} from "react";
import useRestClient from "src/hooks/RestClient.hook.jsx";


function Search() {

  const client = useRestClient();//Custom hook to make API calls

  const [promptForm, setPromptForm] = useState(''); //State to store the prompt form

  //Function to handle the search action
  async function handleGo() {
    await client.search(promptForm); //Make the search API call
    setPromptForm('');//Resets the prompt form
  }
  //Fucnton to update the promp event
  function updatePromptEvent(e) {
    setPromptForm(e.target.value); //Updates the prompt form
  }

  return (<div className={"flex-col hfill p-1 justify-content-space-between"}>
    <div>
    <h1>Hello Secure React World!</h1> {/*Title*/}
    </div>

    <div className={"flex-row wfill gap-1"}>
      {/*Input field to get the search*/}
      <input className={"App-input wfill"} type={"text"} placeholder={"Get started..."}
             value={promptForm}
             onChange={updatePromptEvent}
      />
      {/*Button to search*/}
      <button className={"App-button"} onClick={handleGo}>Go</button>
    </div>
  </div>)
}

export default Search;

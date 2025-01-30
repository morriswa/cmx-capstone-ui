import './Search.page.scss';
import {useState} from "react";
import useRestClient from "src/hooks/RestClient.hook.jsx";


function Search() {

  const client = useRestClient();

  const [promptForm, setPromptForm] = useState('');

  async function handleGo() {
    await client.search(promptForm);
    setPromptForm('');
  }

  function updatePromptEvent(e) {
    setPromptForm(e.target.value);
  }

  return (<div className={"flex-col hfill p-1 justify-content-space-between"}>
    <div>
    <h1>Hello Secure React World!</h1>
    </div>

    <div className={"flex-row wfill gap-1"}>
      <input className={"App-input wfill"} type={"text"} placeholder={"Get started..."}
             value={promptForm}
             onChange={updatePromptEvent}
      />
      <button className={"App-button"} onClick={handleGo}>Go</button>
    </div>
  </div>)
}

export default Search;

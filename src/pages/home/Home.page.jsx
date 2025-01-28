import './Home.page.scss';
import {useState} from "react";


function Home() {

  const [promptForm, setPromptForm] = useState('');
  const [searchHistory, setSearchHistory] = useState([])

  function handleGo() {
    setSearchHistory([promptForm, ...searchHistory]);
    setPromptForm('');
  }

  function updatePromptEvent(e) {
    setPromptForm(e.target.value);
  }

  return (<div className={"flex-col hfill p-1 justify-content-space-between"}>
    <div>
    <h1>Hello Secure React World!</h1>
    </div>


    <h2>Search History</h2>
    <div className={"flex-col gap-1"}>
      {searchHistory.toReversed().map((item, index) => <h3 key={item+index}>{item}</h3>)}
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

export default Home;

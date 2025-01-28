import './Home.page.scss';
import {useState} from "react";


function ColorPalette() {
  return (<>
    <div className={"p-2 primary-background-color alternate-text-color "}>Primary Color</div>
    <div className={"p-2 secondary-background-color "}>Secondary Color</div>
    <div className={"p-2 tertiary-background-color "}>Tertiary Color</div>
    <div className={"p-2 surface-background-color "}>Surface Color</div>
    <div className={"p-2 alternate-surface-background-color "}>Alternate Surface Color</div>
    <div className={"p-2 neutral-background-color "}>Neutral Color</div>
    <div className={"p-2 alternate-neutral-background-color alternate-text-color "}>Alternate Neutral Color</div>
  </>)
}


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
    <ColorPalette/>
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

import './Search.page.scss';
import {useState} from "react";
import useRestClient from "src/hooks/RestClient.hook.jsx";


function Search() {
  const client = useRestClient(); // Custom hook to make API calls
  const [promptForm, setPromptForm] = useState(''); // State to store the prompt form
  const [chatResponse, setChatResponse] = useState(null); // State to store API response
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX


  // Function to handle the search action
  async function handleGo() {
    if (!promptForm.trim()) return; // Don't submit empty prompts
   
    try {
      setIsLoading(true);
      const response = await client.createNewChat(promptForm); // Make the search API call
      setChatResponse(response); // Store the response from the API
    } catch (err) {
      console.error("Error calling createNewChat:", err);
      // Optionally, show error message to user
    } finally {
      setIsLoading(false);
      setPromptForm(''); // Reset the prompt form
    }
  }


  // Function to update the prompt event
  function updatePromptEvent(e) {
    setPromptForm(e.target.value); // Updates the prompt form
  }


  // Handle Enter key press in the input field
  function handleKeyPress(e) {
    if (e.key === 'Enter' && !isLoading) {
      handleGo();
    }
  }


  return (
    <div className={"flex-col hfill p-1 justify-content-space-between"}>
      <div>
        <h1>Hello Secure React World!</h1> {/*Title*/}
      </div>


      <div className={"flex-row wfill gap-1"}>
        {/*Input field to get the search*/}
        <input
          className={"App-input wfill"}
          type={"text"}
          placeholder={"Get started..."}
          value={promptForm}
          onChange={updatePromptEvent}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {/*Button to search*/}
        <button
          className={"App-button"}
          onClick={handleGo}
          disabled={isLoading || !promptForm.trim()}
        >
          {isLoading ? "Loading..." : "Go"}
        </button>
      </div>


      {/* Display the chat response */}
      {chatResponse && chatResponse.length > 0 && (
        <div className={"mt-3 response-container"}>
          <h2>Response:</h2>
          <div className={"prompt-text"}>
            <strong>Prompt:</strong> {chatResponse[0].prompt_text}
          </div>
          <div className={"answer-container"}>
            <strong>Answer:</strong>
            {Array.isArray(chatResponse[0].answer) ? (
              <ul className={"answer-list"}>
                {chatResponse[0].answer.map((answerLine, idx) => (
                  <li key={idx}>{answerLine}</li>
                ))}
              </ul>
            ) : (
              <p>{chatResponse[0].answer}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export default Search;
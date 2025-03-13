// This is a custom react component that displays the text "Thinking..." while the page is loading. KR
function PageLoader() {
  return (
    <div className={"flex-col hfill wfill justify-content-center align-items-center app-background-color"}>
      <h3><i>Thinking...</i></h3>
    </div>
  )
}

export default PageLoader;

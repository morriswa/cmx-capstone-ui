import {cloneElement, useEffect, useRef, useState} from "react";

function Popup({buttonText='Button text unset', children}) {

  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [rendered, setRendered] = useState(<></>);

  useEffect(() => {
    // open or close modal, depending on state
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    // define escape key handler
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    // and register
    document.addEventListener('keydown', handleEscapeKey);

    // cleanup
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  })

  function handleOpen() {
    setRendered(cloneElement(
      children,
      { close: () => setOpen(false)}
    ));
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return <div>
    <button className={"App-button"} onClick={handleOpen}>{buttonText}</button>
    <dialog ref={dialogRef} className={"App-dialog"}>
      <button style={{border: "none", outline: "none", background: "none"}}
              onClick={handleClose} >
        <i className={"fa fa-times fa-3x"} />
      </button>
      {rendered}
    </dialog>
  </div>

}

export default Popup;

import { useRef } from "react"
import "./Modal.css"

export default function Modal({modalTitle, children, open}) {
    const dialog = useRef(null);
    return (<dialog ref={dialog} className="dialog" open={open}>
    <div className="dialog__content">
      <h2>{modalTitle}</h2>
      {children}
    </div>
  </dialog>)
}
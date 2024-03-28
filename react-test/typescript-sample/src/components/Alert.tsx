import {ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClickCloseButton: () => void;
}

const Alert = ({children, onClickCloseButton} : Props ) => {
  return (
    
    <div className="alert alert-primary">
        {children}
        <button type="button" className="btn-close" aria-label="Close" onClick={onClickCloseButton}></button>
    </div>
  )
}

export default Alert

interface Props {
    buttonText: string;
    buttonType?: 'primary' | 'secondary' | 'success' | 'danger'; // primary, secondary, warning, danger
    onClick: () => void;
}

const Button = ({buttonText, buttonType = 'primary', onClick} : Props ) => {
  return (
    <button type="button" className={`btn btn-${buttonType}`} onClick={onClick}> 
        {buttonText}
    </button>
  )
}

export default Button

interface Props {
    buttonText: string;
    buttonType: string; // primary, secondary, warning, danger
}

const Button = ({buttonText, buttonType} : Props ) => {
  return (
    <button type="button" className={`btn btn-${buttonType}`}> 
        {buttonText}
    </button>
  )
}

export default Button
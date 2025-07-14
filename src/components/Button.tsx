type ButtonProps = {
    label: string;
    onClick: () => void;
    disable?: boolean;
}

const Button = ({ label, onClick, disable }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disable}>
        {label}
    </button>
  )
}

export default Button

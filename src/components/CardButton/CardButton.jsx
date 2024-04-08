import "./CardButton.css";

function CardButton({ children, className, ...props }) {
  // const [count, setCounter] = useState(0);
  const cls = "card-button" + (className ? " " + className : "");

  return <button {...props} className={cls}>{children}</button>;
}

export default CardButton;

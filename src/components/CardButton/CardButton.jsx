import "./CardButton.css";

function CardButton({ children, className }) {
  // const [count, setCounter] = useState(0);
  const cls = "card-button" + (className ? " " + className : "");

  return <button className={cls}>{children}</button>;
}

export default CardButton;

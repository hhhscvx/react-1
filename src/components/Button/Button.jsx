import "./Button.css";
import { useState } from "react";

function Button() {
  // let text = "Save";
  const [text, setText] = useState("Сохранить");
  console.log(`text: ${text}`);
  const clicked = () => {
    setText("Закрыть");
  };

  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
}

export default Button;

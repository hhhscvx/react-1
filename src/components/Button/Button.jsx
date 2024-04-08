import { memo } from "react";
import "./Button.css";

function Button({ children }) {
  return (
    <button className="button accent">
      {children}
    </button>
  );
}

export default memo(Button);

import cn from "classnames";
import styles from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(function Input({ className, isValid = true, appearence, ...props }, ref) {
  return (
    <input {...props} ref={ref}
      className={cn(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title",
        [styles["no-title"]]: appearence !== "title",
      })}/>
  );
})

export default Input;

import Button from "../Button/Button";
import "./JournalForm.css";
import { useState } from "react";

function JournalForm() {
  const [inputData, setInputData] = useState("");

  const inputChange = (event) => {
    setInputData(event.target.value);
    console.log(inputData);
  };

  const addJournalItem = (event) => {
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    event.preventDefault();
    console.log(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />

      <input type="date" name="date" />
      <input type="text" name="tag" value={inputData} onChange={inputChange} />
      <textarea name="post" id="" cols="30" rows="10"></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;

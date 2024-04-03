import { useState } from "react";
import Button from "../Button/Button";
import "./JournalForm.css";

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    post: true,
    date: true,
  });

  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData); // надо проверить заполнены ли все поля

    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      // если длина titl`а <= 0
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else setFormValidState((state) => ({ ...state, title: true }));

    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else setFormValidState((state) => ({ ...state, post: true }));

    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else setFormValidState((state) => ({ ...state, date: true }));
    if (!isFormValid) {
      return;
    }

    onSubmit(formProps); // вызываем добавление нового объекта в items
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" style={{border: formValidState.title ? undefined : '1px solid red'}} />
      <input type="date" name="date" style={{border: formValidState.date ? undefined : '1px solid red'}} />
      <input type="text" name="tag" />
      <textarea name="post" id="" cols="30" rows="10" style={{border: formValidState.post ? undefined : '1px solid red'}}></textarea>
      <Button
        text="Сохранить"
        onClick={() => {
          console.log("Clicked");
        }}
      />
    </form>
  );
}

export default JournalForm;

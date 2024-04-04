import { useState } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import clsnames from "classnames";

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
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className="divForm">
        <input
          type="text"
          name="title"
          className={clsnames(styles["input"], styles["title"], {
            [styles["invalid"]]: !formValidState.title, // Если не title, то styles['invalid']
          })}
        />
        <img src="/archive.svg" alt="Date" />
      </div>

      <div
        className="divForm"
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "3px solid #323232",
          paddingBottom: "10px",
        }}
      >
        <img src="/calendar.svg" alt="Date" />
        <label style={{ marginRight: "10px", marginLeft: "20px" }}>Дата</label>
        <input
          type="date"
          name="date"
          className={`${styles["input"]} ${styles["no-title"]} ${
            formValidState.date ? "" : styles.invalid
          }`}
        />
      </div>

      <div
        className="divForm"
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "3px solid #323232",
          paddingBottom: "10px",
        }}
      >
        <img src="/folder.svg" alt="Date" />
        <label style={{ marginRight: "10px", marginLeft: "20px" }}>Метки</label>
        <input type="text" name="tag" className={`${styles["no-title"]}`} />
      </div>
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={`${styles["input"]} ${
          formValidState.post ? "" : styles.invalid
        }`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;

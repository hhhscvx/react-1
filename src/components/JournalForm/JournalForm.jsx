/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import styles from "./JournalForm.module.css";
import clsnames from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef(); // useRef позволяет привязаться к определенному элементу
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus(); // current - это ссылка на тот объект, на который реферится titleRef
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        // Если хоть одно поле не проходит валидацию то оно становится красным, затем спустя две секунды вновь возвращается к нормальному
        dispatchForm({ type: "RESET_VALIDITY" });
        // setFormValidState(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      console.log("Вызван return");
      clearTimeout(timerId); // каждый клик очищается предыдущий таймер
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  }, [userId]);

  const onChange = (event) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [event.target.name]: event.target.value },
    });
    console.log(`formState.values:`);
    console.log(formState.values);
    // передаем в payload: <name_of_input>: <value_of_input>
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData); // надо проверить заполнены ли все поля

    dispatchForm({ type: "SUBMIT", payload: formProps });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className="divForm">
        <Input
          type="text"
          value={values.title}
          onChange={onChange}
          ref={titleRef} // Благодаря forwardRef в компоненте Input присваиваем titleRef к данному инпуту
          name="title"
          appearence="title"
          isValid={isValid.title}
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
        <Input
          type="date"
          value={values.date}
          onChange={onChange}
          ref={dateRef}
          name="date"
          isValid={isValid.date}
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
        <Input type="text" name="tag" value={values.tag} onChange={onChange} />
      </div>
      <textarea
        name="post"
        value={values.post}
        onChange={onChange}
        ref={postRef}
        id=""
        cols="30"
        rows="10"
        className={clsnames(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;

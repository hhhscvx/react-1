import Button from "../Button/Button";
import "./JournalForm.css";


function JournalForm({ onSubmit }) {
  const addJournalItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    onSubmit(formProps); // вызываем добавление нового объекта в items
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>

      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea name="post" id="" cols="30" rows="10"></textarea>
      <Button text="Сохранить" onClick={() => {console.log('Clicked')}}/>
    </form>
  );
}

export default JournalForm;

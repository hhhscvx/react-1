import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton({ children }) {

  return (
    <CardButton className="journal-add">
      [+] Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;

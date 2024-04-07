import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function JournalList({ items }) {
  const { userId } = useContext(UserContext);
  console.log(`userId: ${userId}`);

  if (items.length === 0) {
    return <p>Воспоминаний пока нет...</p>;
  }

  const sortItems = (a, b) => {
    return a.date < b.date ? 1 : -1;
  };

  return (
    <>
      {items
        .filter((el) => Number(el.userId) === Number(userId))
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} post={el.post} date={el.date} />
          </CardButton>
        ))}
    </>
  );
}

export default JournalList;

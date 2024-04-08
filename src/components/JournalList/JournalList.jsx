import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";

function JournalList({ items, setSelectedItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    return a.date < b.date ? 1 : -1;
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId] // filteredItems пересчитывается только тогда, когда меняется items либо userId, работает по аналогии с useEffect`ом
  );

  if (items.length === 0) {
    return <p>Воспоминаний пока нет...</p>;
  }

  return (
    <>
      {filteredItems.map((el) => (
        <CardButton
          key={el.id}
          onClick={() => {
            setSelectedItem(el);
          }}
        >
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;

import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/leftPanel/LeftPanel";
import { useState } from "react";

const INITIAL_DATA = [
  {
    title: "Подготовка к обновлению курсов",
    text: "Горные походы открывают удивительные природные ландшафт",
    date: new Date(),
  },
  {
    title: "Поход в годы",
    text: "Думал, что очень много времени",
    date: new Date(),
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems, // создаем новый массив со всеми старыми items + новым item
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date)
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <JournalAddButton></JournalAddButton>

        <JournalList>
          {/* {[<Button>1</Button>, <Button>2</Button>]} */}
          {items.map((el) => (
            <CardButton>
              <JournalItem title={el.title} text={el.text} date={el.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>{" "}
        {/* Передаем функцию addItem как props в JournalForm */}
      </Body>
    </div>
  );
}

export default App;

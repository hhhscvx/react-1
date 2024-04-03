import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/leftPanel/LeftPanel";
import { useState } from "react";

const INITIAL_DATA = [
  // {
  //   title: "Подготовка к обновлению курсов",
  //   text: "Горные походы открывают удивительные природные ландшафт",
  //   date: new Date(),
  // },
  // {
  //   title: "Поход в годы",
  //   text: "Думал, что очень много времени",
  //   date: new Date(),
  // },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems, // создаем новый массив со всеми старыми items + новым item
      {
        text: item.post,
        title: item.title,
        date: new Date(item.date),
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1, // берем максимальный id из item`ов списка и прибавляем 1 (новый элемент)
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <JournalAddButton></JournalAddButton>

        <JournalList items={items}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>{" "}
        {/* Передаем функцию addItem как props в JournalForm */}
      </Body>
    </div>
  );
}

export default App;

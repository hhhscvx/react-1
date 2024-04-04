import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/leftPanel/LeftPanel";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // сработает только один раз т.к. передан пустой массив
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setItems(
        // каждый вызов функции ререндерит компонент, а каждый ререндер ререндерит компонент и т.д. до бесконечности. На помощь приходит useEffect
        data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);
  // Пустой массив зависимостей указывает, что useEffect не зависит от изменений каких-либо переменных или
  // состояний, и должен быть вызван только при первом рендере компонента (монтировании).

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

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

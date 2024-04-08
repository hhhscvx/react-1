import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import useLocalStorage from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((el) => ({
    ...el,
    date: new Date(el.date),
  }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState({});

  const deleteItem = (id) => { // Оставляем в localStorage только те данные, id которых не равен тому, который удаляем, короче оставляем все кроме удаляемого потому что мы его удалили бля
    setItems([...items.filter((item) => item.id !== id)]);
  };

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1, // берем максимальный id из item`ов списка и прибавляем 1 (новый элемент)
        },
      ]);
    } else {
      setItems(
        mapItems(items).map((el) => {
          if (el.id === item.id) {
            return {
              ...item,
              date: new Date(item.date),
            };
          }
          return el;
        })
      );
    }
  };

  return (
    <UserContextProvider>
      {/* пользователь будет доступен везде в App.jsx в виде его контекста */}
      {/* мы сделали это для того, чтобы измения контекст в Select`е, он менялся в форме */}
      <div className="app">
        <LeftPanel>
          <Header />

          <JournalAddButton></JournalAddButton>

          <JournalList
            items={mapItems(items)}
            setSelectedItem={setSelectedItem}
          ></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            selectedItem={selectedItem}
            deleteItem={deleteItem}
          ></JournalForm>
          {/* Передаем функцию addItem как props в JournalForm */}
        </Body>
        {/* Мы не можем Consum`ить наш контекст вне компонента, который обернут в Context.Provider */}
      </div>
    </UserContextProvider>
  );
}

export default App;

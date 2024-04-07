import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import useLocalStorage from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";

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

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1, // берем максимальный id из item`ов списка и прибавляем 1 (новый элемент)
      },
    ]);
  };

  return (
    <UserContextProvider>
      {/* пользователь будет доступен везде в App.jsx в виде его контекста */}
      {/* мы сделали это для того, чтобы измения контекст в Select`е, он менялся в форме */}
      <div className="app">
        <LeftPanel>
          <Header />

          <JournalAddButton></JournalAddButton>

          <JournalList items={mapItems(items)}></JournalList>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem}></JournalForm>
          {/* Передаем функцию addItem как props в JournalForm */}
        </Body>
        {/* Мы не можем Consum`ить наш контекст вне компонента, который обернут в Context.Provider */}
      </div>
    </UserContextProvider>
  );
}

export default App;

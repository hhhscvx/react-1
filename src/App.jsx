import "./App.css";
import Header from "./components/Header/Header";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/leftPanel/LeftPanel";
import useLocalStorage from "./hooks/use-localstorage.hook";

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
  const [items, setItems] = useLocalStorage('data');

  const addItem = (item) => {
    setItems([...mapItems(items),
      {
        text: item.post,
        title: item.title,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1, // берем максимальный id из item`ов списка и прибавляем 1 (новый элемент)
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <JournalAddButton></JournalAddButton>

        <JournalList items={mapItems(items)}></JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}></JournalForm>{" "}
        {/* Передаем функцию addItem как props в JournalForm */}
      </Body>
    </div>
  );
}

export default App;

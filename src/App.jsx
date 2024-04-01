import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/leftPanel/LeftPanel";

function App() {
  const data = [
    {
      title: "Первая заметка",
      date: new Date(),
      text: "(coca)",
    },
    {
      title: "анжумания",
      date: new Date(),
      text: "Тудулистu",
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header />

        <JournalAddButton></JournalAddButton>

        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>

          <CardButton>
            <JournalItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        Body
        <Button />
      </Body>
      <p>Paragraph</p>
    </div>
  );
}

export default App;

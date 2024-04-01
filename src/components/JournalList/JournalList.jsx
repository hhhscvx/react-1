import "./JournalList.css";

function JournalList({ children }) {
  // const [count, setCounter] = useState(0);

  return (
    <div className="journal-list">
      {children}
    </div>
  );
}

export default JournalList;

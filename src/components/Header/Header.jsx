import "./Header.css";

function Header({ children }) {
  return (
    <img src="/logo.svg" alt="Personal Journal" className="logo" />
  );
}

export default Header;

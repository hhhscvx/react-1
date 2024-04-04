import styles from "./Header.module.css";

function Header({ children }) {
  return <img className={styles.logo} src="/logo.svg" alt="Personal Journal" />;
  // импортируем стили из модуля css и присваиваем из них класс Logo нашему header`у
}

export default Header;

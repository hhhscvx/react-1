/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import styles from './SelectUser.module.css'

function SelectUser({ ref }) {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (event) => {
    console.log(`ref: ${ref}`);
    setUserId(Number(event.target.value));
    // при изменении селекта передаем в State user`а value текущего выбранного user`а
    // и затем контекст меняется, а он отображается в форме и мы видим изменения в моменте
  };

  return (
    <select className={styles['select']} name="user" id="user" ref={ref} value={userId} onChange={changeUser}>
      <option value="1">Вася</option>
      <option value="2">Серега пират</option>
    </select>
  );
}

export default SelectUser;

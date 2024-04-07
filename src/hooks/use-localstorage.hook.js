/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function useLocalStorage(key) {
  const [data, setData] = useState();

  useEffect(() => {
    // сработает только один раз т.к. передан пустой массив
    const res = JSON.parse(localStorage.getItem(key)); // распаковываем из localStorage данные по нашему ключу
    if (res) { // и если они есть - записываем в data и к ним можно будет обратиться как useLocalStorage("data").data
      setData(res);
    }
  }, []);

  const saveData = (newData) => { // Обратимся как useLocalStorage("data").saveData({<наш_json>}) и в localStorage под ключом data будет записан данный json
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}

export default useLocalStorage;

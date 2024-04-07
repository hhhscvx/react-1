import { useCallback, useState } from "react";
import Button from "../Button/Button";
import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";

const logos = ["/archive.svg", "/vite.svg"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  console.log("Header");

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
    setSecondIndex((i) => i + 1); // Тут происходит два setState`а, но компонент не ререндерится дважды т.к. они стоят в одном блоке планировки событий
    console.log(secondIndex);
  };

  return (
    <>
      <Logo image={logos[logoIndex]} />
      <SelectUser />
      <Button onClick={toggleLogo}>Параша ебаная</Button>
    </>
  );
}

export default Header;

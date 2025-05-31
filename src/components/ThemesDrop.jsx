import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function ThemesDrop() {
  const [dark, setDark] = useState(() => {
    const updTheme = localStorage.getItem("theme");
    if (updTheme) {
      document.documentElement.dataset.theme = updTheme;
      return updTheme.startsWith("dark-");
    }
    return document.documentElement.dataset.theme.startsWith("dark-");
  });

  function themeMode() {
    setDark((prev) => !prev);
  }

  useEffect(() => {
    if (dark) {
      document.documentElement.dataset.theme = "dark-violet";
      localStorage.setItem("theme", "dark-violet");
    } else {
      document.documentElement.dataset.theme = "violet";
      localStorage.setItem("theme", "violet");
    }
  }, [dark]);

  if (dark) {
    return (
      <Button onClick={themeMode} className="rounded-2xl !bg-transparent">
        <img src="./image/LightMode.svg" alt="dark" width={25} height={25} />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={themeMode}
        className="rounded-2xl !bg-transparent"
      >
        <img src="./image/DarkMode.svg" alt="light" width={25} height={25} />
      </Button>
    );
  }
}

export default ThemesDrop;

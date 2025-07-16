"use client";

import { useEffect, useState } from "react";
import { changeTheme as ct } from "@/actions/theme";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState("");

  const changeTheme = async (theme: Theme) => {
    if (theme === "dark") {
      setTheme("dark");
      await ct("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      await ct("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return { theme, changeTheme };
}

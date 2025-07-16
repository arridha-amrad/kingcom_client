import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ButtonTheme() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  console.log({ theme });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        setTheme("dark");
      }
    }
    // eslint-disable-next-line
  }, [theme]);

  if (!isMounted) return null;

  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      title="Switch theme"
      className="aspect-square h-1/2 flex items-center justify-center"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

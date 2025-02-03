import { useTheme } from "./ThemeContext";

const useDarkMode = () => {
  const { theme, toggleTheme } = useTheme();

  return [theme, toggleTheme];
};

export default useDarkMode;

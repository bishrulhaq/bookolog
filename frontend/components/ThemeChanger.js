import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const darkModeListener = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          name="dark-mode"
          id="dark-toggle"
          className="checkbox hidden"
          onChange={(e) => darkModeListener(e.target.checked)}
          checked={theme === 'dark'}
        />
        <div className="block border-[1px] dark:border-white border-gray-900 w-8 h-5 rounded-full"></div>
        <div className="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-3 h-3 rounded-full transition"></div>
      </div>
      <div className={`ml-3 dark:text-white text-gray-900 font-medium ${theme === 'dark' ? 'moon' : 'sun'}`}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </label>
  );
};

export default ThemeChanger;

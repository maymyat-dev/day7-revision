import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext } from '../context/ThemeContext';

function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((prev)=> prev === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark')
        root.classList.add(theme);
    },[theme])
  return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
          {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
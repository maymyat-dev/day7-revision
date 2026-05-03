import { useContext } from 'react'
import LogicPractice from './components/LogicPractice'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>{theme}</button>
      <LogicPractice/>
    </div>
  )
}

export default App
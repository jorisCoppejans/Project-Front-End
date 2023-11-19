import { createContext } from 'react';
import CollectionList from './components/collections/CollectionList'
import CoinList from './components/coins/CoinList'
import { ThemeContext, themes } from './contexts/Theme.context';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';
import { useContext } from 'react';

function App() {
  const { theme, oppositeTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>{/* 👈 3 */}
    <button type="button" onClick={toggleTheme}>{/* 👈 4 */}
      {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
    </button>
      <CollectionList/>
      <CoinList />
    </div>
     
  );
}

export default App;
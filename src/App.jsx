import CollectionList from './components/collections/CollectionList'
import CoinList from './components/coins/CoinList'
import { useTheme, themes } from './contexts/Theme.context';
import { IoMoonSharp, IoSunny } from 'react-icons/io5';

function App() {
  const { theme, oppositeTheme, toggleTheme } = useTheme();

  return (
    <div className={`container-xl bg-${theme} text-${oppositeTheme}`}>
    <button type="button" onClick={toggleTheme}>
      {theme === themes.dark ? <IoMoonSharp /> : <IoSunny />}
    </button>
      <CollectionList/>
      <CoinList />
    </div>
     
  );
}

export default App;
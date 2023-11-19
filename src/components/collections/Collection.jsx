import { COINS_DATA } from '../../assets/data/mock_data';
import Coin from '../coins/Coin';
import { ThemeContext } from '../../contexts/Theme.context';
import { memo, useState, useMemo, useCallback, useContext } from 'react';

export default memo(function Collection(props) {
  const { id, userId, value} = props;
  console.log('Rendering collection...');

  const [coins, setCoins] = useState(COINS_DATA);
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
      setCoins(newCoin);
  };

  const indentedTextStyle = {
    textIndent: '4em',
  };

  const { theme } = useContext(ThemeContext);

  return (
  <>
  <tr>
  <td>{id}</td>
  <td>{userId}</td>
  <td>€ {value}</td>
  </tr>
  <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr style={indentedTextStyle}>
            <th>Name</th>
            <th>Id</th>
            <th>Value</th>
            <th>Favorite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {coins.filter((c) => c.collectionId === id).map((c) => (
      <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin}/>
    ))}
        </tbody>
      </table>
    </div>
    
  </>
  );
});

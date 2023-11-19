import { useState } from 'react';
import { COINS_DATA } from '../../assets/data/mock_data';
import Coin from '../coins/Coin';
import { memo } from 'react';

export default memo(function Collection(props) {
  const { id, userId, value} = props;
  console.log('Rendering collection...');

  const [coins, setCoins] = useState(COINS_DATA);
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
      setCoins(newCoin);
  };

  return (
  <>
  <tr>
  <td>{id}</td>
  <td>{userId}</td>
  <td>€ {value}</td>
  </tr>
    {coins.filter((c) => c.collectionId === id).map((c) => (
      <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin}/>
    ))}
  </>
  );
});

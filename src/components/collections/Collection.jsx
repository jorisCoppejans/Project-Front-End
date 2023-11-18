import { useState } from 'react';
import { COINS_DATA } from '../../assets/data/mock_data';
import Coin from '../coins/Coin';


// src/components/transactions/Transaction.jsx
import { memo } from 'react'; // 👈

export default memo(function Transaction(props) { // 👈
  const { id, userId, value} = props;
  console.log('Rendering transaction...');

  const [coins, setCoins] = useState(COINS_DATA);
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
      setCoins(newCoin);
  };

  return (
  <>
  <div className="text-bg-dark" >{id}</div>
  <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3'>
    {coins.filter((c) => c.collectionId === id).map((c) => (
      <div className='col' key={c.id}>
        <Coin {...c} onFavo={handleFavoriteCoin}/>
      </div>
    ))}
  </div>
  </>
  );
});

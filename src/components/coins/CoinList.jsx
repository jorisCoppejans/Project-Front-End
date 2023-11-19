import { COINS_DATA } from '../../assets/data/mock_data';
import { useState, useMemo, useCallback } from 'react';
import CoinForm from './CoinForm';
import Coin from './Coin';


export default function CoinList() {
  const [coins, setCoins] = useState(COINS_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const createCoin = useCallback((id, naam, value, collectionId, favorite) => {
    const newCoins = [
      {
        id,
        naam,
        value, 
        collectionId, 
        favorite,
      },
      ...coins,
    ];
    setCoins(newCoins);
    console.log('coins', JSON.stringify(coins));
    console.log('newCoins', JSON.stringify(newCoins));
  }, [coins]);

  return (
    <>
      <h1>Coins</h1>
      <CoinForm onSaveCoin={createCoin} />
    </>
  );
}
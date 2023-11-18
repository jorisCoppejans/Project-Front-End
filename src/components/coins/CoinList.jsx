import { COINS_DATA } from '../../assets/data/mock_data';
import { useState } from 'react';
import CoinForm from './CoinForm';


export default function CoinList() {

  const [coins, setCoins] = useState(COINS_DATA);

  const createCoin= (id, naam, value, collectionId, favorite) => {
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
  };

  return (
    <>
      <h1>Coins</h1>
      <CoinForm onSaveCoin={createCoin} />
    </>
  );
}
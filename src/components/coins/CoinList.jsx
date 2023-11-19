import { COINS_DATA } from '../../assets/data/mock_data';
import { useState, useMemo, useCallback } from 'react';
import CoinForm from './CoinForm';
import Coin from './Coin';

function CoinTable({
  coins
}) {
  if (coins.length === 0) {
    return (
      <div className="alert alert-info">
        There are no coins yet.
      </div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive`}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Value</th>
            <th>CollectionId</th>
            <th>Favorite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <Coin key={coin.id} {...coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
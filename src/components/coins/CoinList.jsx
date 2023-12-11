import { COINS_DATA } from '../../assets/data/mock_data';
import { useState, useMemo, useCallback, useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import CoinForm from './CoinForm';
import Coin from './Coin';
import useSWR, { mutate } from 'swr';
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';
import AsyncData from '../AsyncData';



export default function CoinList() {
  const {data: coins = [], isLoading, error} = useSWR('coins', getAll);
  const [currentCoin, setCurrentCoin] = useState({});
  const { trigger: deleteCoin, error: deleteError } = useSWRMutation('coins', deleteById);
  const [search, setSearch] = useState('');

  const filteredCoins = useMemo(() => coins.filter((c) => {
    return String(c.id).includes(search);
  }), [search, coins]);

  const setCoinToUpdate = useCallback((id) => {
    setCurrentCoin(id === null ? {} : coins.find((t) => t.id === id));
  }, [coins]);

  return (
    <>
      <h1>Coins</h1>
      <CoinForm setCoinToUpdate={setCoinToUpdate} currentCoin={currentCoin} />

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error || deleteError}>
          {!error ? (
            <CoinTable
              coins={filteredCoins}
              onDelete={deleteCoin}
              onEdit={setCoinToUpdate}
            />
          ) : null}
        </AsyncData>
      </div>
    </>
  );
}


function CoinTable({
  coins,
  onEdit,
  onDelete
}) {
  const { theme } = useContext(ThemeContext);

  if (coins.length === 0) {
    return (
      <div className="alert alert-info">
        There are no coins yet.
      </div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Value</th>
            <th>Favorite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {coins.map((coin) => (
            <Coin
              {...coin}
              key={coin.id}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
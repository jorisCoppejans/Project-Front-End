import Coin from '../coins/Coin';
import { memo, useCallback } from 'react';
import '../../index.css';
import { IoTrashOutline } from 'react-icons/io5';
import useSWR, { mutate } from 'swr';
import { getAll } from '../../api';


export default memo(function Collection( {id, userId, onDelete}) {
  const {data: coins = []} = useSWR('coins', getAll);

  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
    mutate('coins', newCoin, false);
  };  
  
  const calculateSum = (coins, id) => {
    const filteredCoins = coins.filter((c) => c.collectionId === id);
    
    const sum = filteredCoins.reduce((accumulator, coin) => {
      return accumulator + parseFloat(coin.value);
    }, 0);
  
    return sum;
  };

  const value = calculateSum(coins, id);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
  <>
  <tr data-cy="collection">
    <td data-cy="collectionId">{id}</td>
    <td data-cy="collectionValue">€ {value}</td>
    <td>
      <button className='btn btn-primary' onClick={handleDelete} data-cy="collectionRemoveButton">
        <IoTrashOutline />
      </button>
    </td>
  </tr>
  <tr className="indentedText">
    <th data-cy="collectionCoinName">Name</th>
    <th data-cy="collectionCoinValue">Value</th>
    <th></th>
  </tr>
    {coins.filter((c) => c.collectionId === id).map((c) => (
      <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin} onDelete = {onDelete}/>
    ))}
  </>
  );
});

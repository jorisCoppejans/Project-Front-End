import Coin from '../coins/Coin';
import { memo, useCallback } from 'react';
import '../../index.css';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import useSWR, { mutate } from 'swr';
import { getAll } from '../../api';
import CoinList from '../../pages/coins/CoinList';


export default memo(function Collection( {id, userId, onDelete, onEdit}) {
  //constants
  const {data: coins = []} = useSWR('coins', getAll);
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
    mutate('coins', newCoin, false);
  };  
  
  const calculateSum = (coins, id) => {
    const filteredCoins = coins.filter((c) => c.collectionId === id);
    
    const sum = filteredCoins.reduce((accumulator, coin) => {
      return accumulator + coin.value;
    }, 0);
  
    return sum;
  };

  const value = calculateSum(coins, id);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  return (
  <>
  <tr data-cy="collection">
    <td data-cy="collectionId">{id}</td>
    <td data-cy="collectionUser">{userId}</td>
    <td data-cy="collectionValue">€ {value}</td>
    <td>
      <button type="button" className="btn btn-light" onClick={handleEdit} data-cy="collectionEditButton">
        <IoPencil />
      </button>
      <button className='btn btn-primary' onClick={handleDelete} data-cy="collectionRemoveButton">
        <IoTrashOutline />
      </button>
    </td>
  </tr>
  <tr className="indentedText">
    <th data-cy="collectionCoinName">Name</th>
    <th data-cy="collectionCoinId">Id</th>
    <th data-cy="collectionCoinValue">Value</th>
    <th data-cy="collectionCoinFavorite">Favorite</th>
    <th></th>
  </tr>
  <CoinList data-cy="collectionCoins"></CoinList>
    {/* {coins.filter((c) => c.collectionId === id).map((c) => (
      <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin} onDelete = {onDelete} onEdit = {onEdit}/>
    ))} */}
  </>
  );
});

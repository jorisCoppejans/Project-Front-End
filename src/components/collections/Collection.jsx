import Coin from '../coins/Coin';
import { memo, useCallback } from 'react';
import '../../index.css';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import useSWR, { mutate } from 'swr';
import { getAll } from '../../api';
import CoinList from '../coins/CoinList';


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
  <tr>
    <td>{id}</td>
    <td>{userId}</td>
    <td>€ {value}</td>
    <td>
      <button type="button" className="btn btn-light" onClick={handleEdit}>
        <IoPencil />
      </button>
      <button className='btn btn-primary' onClick={handleDelete}>
        <IoTrashOutline />
      </button>
    </td>
  </tr>
  <tr className="indentedText">
    <th>Name</th>
    <th>Id</th>
    <th>Value</th>
    <th>Favorite</th>
    <th></th>
  </tr>
  <CoinList></CoinList>
    {/* {coins.filter((c) => c.collectionId === id).map((c) => (
      <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin} onDelete = {onDelete} onEdit = {onEdit}/>
    ))} */}
  </>
  );
});

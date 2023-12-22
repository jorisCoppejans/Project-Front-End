import Coin from '../coins/Coin';
import { memo, useCallback } from 'react';
import '../../index.css';
import { IoTrashOutline } from 'react-icons/io5';
import useSWR, { mutate } from 'swr';
import { getAll } from '../../api';
import { useCurrency } from '../../contexts/Currency.context';


export default memo(function Collection( {id, onDelete}) {
  const {data: coins = []} = useSWR('coins', getAll);
  const { Currency } = useCurrency();


  
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

  let value = calculateSum(coins, id);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  function handleValue(value){
    if (Currency === "$"){
      value *= 1.1; 
    }
    return value
  }

  function handleSign(){
    if (Currency === "$"){
      return "$"
    }
    return "€"
  }

  return (
  <>
  <tr data-cy="collection">
    <td data-cy="collectionId">{id}</td>
    <td data-cy="collectionValue">{handleSign()}{value = handleValue(value)}</td>
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

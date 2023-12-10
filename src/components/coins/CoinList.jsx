import { COINS_DATA } from '../../assets/data/mock_data';
import { useState, useMemo, useCallback } from 'react';
import CoinForm from './CoinForm';
import Coin from './Coin';
import useSWR, { mutate } from 'swr';
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';



export default function CoinList() {
  const {data: coins = [], isLoading, error} = useSWR('coins', getAll);
  const [currentCoin, setCurrentCoin] = useState({});

  const setCoinToUpdate = useCallback((id) => {
    setCurrentCoin(id === null ? {} : coins.find((t) => t.id === id));
  }, [coins]);


  return (
    <>
      <h1>Coins</h1>
      <CoinForm setCoinToUpdate = {setCoinToUpdate} currentCoin = {currentCoin} />
    </>
  );
}
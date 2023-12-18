import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById, getAll } from "../../api";
import CoinForm from '../../components/coins/CoinForm';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditCoin() {
  const { id } = useParams();

  const {
    data: coin,
    error: coinsError,
    isLoading: coinsLoading,
  } = useSWR(id ? `coins/${id}`: null, getById);

  return (
    <>
      <AsyncData error={coinsError} loading={coinsLoading}>
        <CoinForm coin = {coin} />
      </AsyncData>
    </>
  );
}
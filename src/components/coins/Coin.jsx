import Favorite from "./Favorite";
import { memo } from "react";

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default memo(function Coin({id, naam, collectionId, value, favorite, onFavo}) {
  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  return (
    <div className='text-bg-dark' style={{ textAlign: 'center' }}>
      {naam} met id: {id} is van collectie {collectionId} en heeft een waarde van €{value}
      <Favorite selectedFavorite = {favorite} onFavo = {handleFavoriteCoin}/>

    </div>
  );
});

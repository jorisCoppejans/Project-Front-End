import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import '../../index.css'
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { memo, useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteById } from '../../api';
import { Link } from "react-router-dom";
import { useCurrency } from "../../contexts/Currency.context";



export default memo(function Coin({id, name, value, favorite, onFavo, onDelete}) {
  const { theme, oppositeTheme } = useThemeColors();
  const { trigger: deleteCoin } = useSWRMutation('coins', deleteById);
  const { Currency } = useCurrency();


  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  const handleDeleteCoin = useCallback(() => {
    deleteCoin(id);
  }, [id, onFavo, onDelete, deleteCoin]);

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
      <tr className={`bg-${theme} border-${oppositeTheme} indentedText`}>
      <td>{name}</td>
      <td>{handleSign()}{value = handleValue(value)}</td>
      <td><Favorite selectedFavorite={favorite} onFavo={handleFavoriteCoin} /></td>
      <td>
      <Link type="button" className="btn btn-light" to={`/coins/edit/${id}`}>
        <IoPencil />
      </Link>
      <button className='btn btn-primary' onClick={handleDeleteCoin}>
        <IoTrashOutline />
      </button>
      </td>
      </tr>
  );
});

import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import '../../index.css'
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { memo, useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteById } from '../../api';
import { Link } from "react-router-dom";



export default memo(function Coin({id, name, value, favorite, onFavo, onDelete, onEdit}) {
  const { theme, oppositeTheme } = useThemeColors();
  const { trigger: deleteCoin } = useSWRMutation('coins', deleteById);

  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  const handleDeleteCoin = useCallback(() => {
    deleteCoin(id);
  }, [id, onFavo, onDelete, deleteCoin]);


  return (
      <tr className={`bg-${theme} border-${oppositeTheme} indentedText`}>
      <td>{name}</td>
      <td>€{value}</td>
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

import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import '../../index.css'
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { memo, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';
import { Link } from "react-router-dom";



export default memo(function Coin({id, name, value, favorite, onFavo, onDelete, onEdit}) {
  // themes
  const { theme, oppositeTheme } = useThemeColors();
  const { trigger: deleteCoin, error: deleteError } = useSWRMutation('coins', deleteById);

  //methodes
  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  const handleDeleteCoin = useCallback(() => {
    deleteCoin(id);
  }, [id, onFavo, onDelete, deleteCoin]);


  return (
      <tr className={`bg-${theme} border-${oppositeTheme} indentedText`}>
      <td>{name}</td>
      {/* <td>{id}</td> */}
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

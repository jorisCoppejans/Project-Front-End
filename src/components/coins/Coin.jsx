import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import '../../index.css'
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { memo, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';



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

  const handleEditCoin = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  return (
      <tr className={`bg-${theme} border-${oppositeTheme} indentedText`}>
      <td>{name}</td>
      <td>{id}</td>
      <td>{value}</td>
      <td><Favorite selectedFavorite={favorite} onFavo={handleFavoriteCoin} /></td>
      <td>
      <button type="button" className="btn btn-light" onClick={handleEditCoin}>
        <IoPencil />
      </button>
      <button className='btn btn-primary' onClick={handleDeleteCoin}>
        <IoTrashOutline />
      </button>
      </td>
      </tr>
  );
});

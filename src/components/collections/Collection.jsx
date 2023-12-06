import { COINS_DATA } from '../../assets/data/mock_data';
import Coin from '../coins/Coin';
import { ThemeContext } from '../../contexts/Theme.context';
import { memo, useState, useContext, useCallback } from 'react';
import '../../index.css';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';


export default memo(function Collection( {id, userId, value, onDelete, onEdit}) {
  //constants
  const [coins, setCoins] = useState(COINS_DATA);
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
      setCoins(newCoin);
  };

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [id, onEdit]);

  const { theme } = useContext(ThemeContext);

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
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr className="indentedText">
            <th>Name</th>
            <th>Id</th>
            <th>Value</th>
            <th>Favorite</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {coins.filter((c) => c.collectionId === id).map((c) => (
          <Coin key = {c.id} {...c} onFavo={handleFavoriteCoin}/>
         ))}
        </tbody>
      </table>
  </>
  );
});

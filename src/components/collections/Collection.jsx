import { COINS_DATA } from '../../assets/data/mock_data';
import Coin from '../coins/Coin';
import { ThemeContext } from '../../contexts/Theme.context';
import { memo, useState, useContext } from 'react';
import '../../index.css'


export default memo(function Collection(props) {
  //constants
  const [coins, setCoins] = useState(COINS_DATA);
  const {id, userId, value} = props;
  console.log('Rendering collection...');
  
  const handleFavoriteCoin = (id, favorite) => {
    const newCoin = coins.map((c) => (c.id === id ? { ...c, favorite } : c));
      setCoins(newCoin);
  };

  const { theme } = useContext(ThemeContext);

  return (
  <>
  <tr>
  <td>{id}</td>
  <td>{userId}</td>
  <td>€ {value}</td>
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

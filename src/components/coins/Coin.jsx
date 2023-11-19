import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import { memo } from 'react';
import '../../index.css'


export default memo(function Coin({id, name, value, favorite, onFavo}) {
  // themes
  const { theme, oppositeTheme } = useThemeColors();

  //methodes
  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  return (
      <tr className={`bg-${theme} border-${oppositeTheme} indentedText`}>
      <td>{name}</td>
      <td>{id}</td>
      <td>{value}</td>
      <td><Favorite selectedFavorite={favorite} onFavo={handleFavoriteCoin} /></td>
      </tr>
  );
});

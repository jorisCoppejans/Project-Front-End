import Favorite from "./Favorite";
import { useThemeColors } from '../../contexts/Theme.context';
import { memo } from 'react';

export default memo(function Coin({id, name, collectionId, value, favorite, onFavo}) {
  const { theme, oppositeTheme } = useThemeColors();

  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  const indentedTextStyle = {
    textIndent: '4em',
  };

  return (
      <tr style={indentedTextStyle} className={`bg-${theme} border-${oppositeTheme}`}>
      <td>{name}</td>
      <td>{id}</td>
      <td>{value}</td>
      <td><Favorite selectedFavorite={favorite} onFavo={handleFavoriteCoin} /></td>
      </tr>
    
  );
});

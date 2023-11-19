import Favorite from "./Favorite";
import { memo } from "react";

export default memo(function Coin({id, name, collectionId, value, favorite, onFavo}) {
  const handleFavoriteCoin = (newfavorite) => {
    onFavo(id, newfavorite);
  };

  const indentedTextStyle = {
    textIndent: '2em',
  };

  return (
  <tr>
  <td style={indentedTextStyle}>
    {name} met id: {id} is van collectie {collectionId} en heeft een waarde van €{value}
  </td>
  <td>
    <Favorite selectedFavorite={favorite} onFavo={handleFavoriteCoin} />
  </td>
  </tr>
    
  );
});

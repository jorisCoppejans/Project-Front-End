import { IoHeart } from 'react-icons/io5';

const Favo = ({ selected, onSelect = (f) => f}) =>{
  const handleSelect = () => {
    onSelect(selected === false ? true : false);
  };
  
  return(
    <IoHeart color={selected ? 'blue' : 'grey'} onClick={handleSelect}/>
  )
};


export default function Favorite({ 
  totalFavo = 1, 
  selectedFavorite = 0,
  onFavo,
}) {

  return (
    <>
      {[...new Array(totalFavo)].map((_, i) => (
        <Favo key={i} selected={selectedFavorite > i} onSelect={onFavo}/>
      ))}
    </>
  );
}
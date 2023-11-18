import Collection from './Collection';
import { COLLECTIONS_DATA } from '../../assets/data/mock_data';
import { useState, useMemo, useCallback } from 'react';
import CollectionsForm from './CollectionsForm';
 

export default function CollectionList() {

  const [collections, setCollections] = useState(COLLECTIONS_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  {/*Filteren van de collecties*/}
  const filteredCollections = useMemo(() => collections.filter((c) => {
    console.log('filtering...');
    return c.id.includes(search);
  }) ,[search, collections]);

  {/*creeeren van nieuwe collectie en alles teruggeven */}
  const createCollection = useCallback((id, userId, value) => {
    const newCollections = [
      {
        id,
        userId,
        value,
      },
      ...collections,
    ];
    setCollections(newCollections);
    console.log('collections', JSON.stringify(collections));
    console.log('newCollections', JSON.stringify(newCollections));
  }, [collections]);
  

  return (
    <>
      <h1>Collections</h1>
      <CollectionsForm onSaveCollection={createCollection} />
      
          {/*filterknopje*/}
      <div className="input-group mb-3 w-50">
        <input
          type="search"
          id="search"
          className="form-control rounded"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)} />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setSearch(text)}
        >
          Search
        </button>
      </div>
      {filteredCollections.sort((a, b) => a.id-b.id).map((colls, index) =>
        <Collection {...colls} key={index} /> )}
    </>
  );
}
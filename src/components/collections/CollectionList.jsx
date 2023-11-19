import Collection from './Collection';
import { COLLECTIONS_DATA } from '../../assets/data/mock_data';
import CollectionsForm from './CollectionsForm';
import { ThemeContext } from '../../contexts/Theme.context';
import { useState, useMemo, useCallback, useContext } from 'react';

function CollectionTable({
  collections
}) {
  const { theme } = useContext(ThemeContext);
  
  if (collections.length === 0) {
    return (
      <div className="alert alert-info">
        There are no collections yet.
      </div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr>
            <th>Id</th>
            <th>UserId</th>
            <th>Total value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <Collection key={collection.id} {...collection} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function CollectionList() {

  const [collections, setCollections] = useState(COLLECTIONS_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  {/*Filteren van de collecties*/}
  const filteredCollections = useMemo(() => collections.filter((c) => {
   return c.id.includes(search);
  }), [search, collections]);

  {/*creeeren van nieuwe collectie en alles teruggeven */}
  const createCollection = useCallback((id, userId, value) => {
    const newCollections = [{id, userId, value}, ...collections];
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
          placeholder="Filter collections on id"
          value={text}
          onChange={(e) => setText(e.target.value)} />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setSearch(text)}>Search</button>
      </div>
      <div className="mt-4">
        <CollectionTable collections={filteredCollections} />
      </div>
    </>
  );
}
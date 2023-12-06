import Collection from './Collection';
import CollectionsForm from './CollectionsForm';
import { ThemeContext } from '../../contexts/Theme.context';
import { useState, useMemo, useCallback, useContext } from 'react';
import * as CollectionsApi from '../../api'
import AsyncData from '../AsyncData';
import { set } from 'react-hook-form';
import useSWR from 'swr';
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';


function CollectionTable({collections, onDelete, onEdit}) {
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
          {collections.sort().map((collection) => (
            <Collection key={collection.id} onDelete = {onDelete} onEdit = {onEdit} {...collection} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function CollectionList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const {data: collections = [], isLoading, error} = useSWR('collections', getAll);
  const { trigger: deleteCollection, error: deleteError } = useSWRMutation('collections', deleteById);
  const [currentCollection, setCurrentCollection] = useState({});

  //Filtering of collections
  const filteredCollections = useMemo(() => collections.filter((c) => {
    return String(c.id).includes(search);
  }), [search, collections]);

  //create new collection
  const createCollection = useCallback((id, userId) => {
    const newCollections = [{id, userId}, ...collections];
  }, [collections]);

  const setCollectionToUpdate = useCallback((id) => {
    setCurrentCollection(id === null ? {} : collections.find((t) => t.id === id));
  }, [collections]);

  return (
    <>
      <h1>Collections</h1>
      <CollectionsForm setCollectionToUpdate = {setCollectionToUpdate} currentCollection = {currentCollection}/>

      
      {/*filterButton*/}
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
      <AsyncData loading={isLoading} error={error || deleteError}>
        {!error ? <CollectionTable 
        collections={filteredCollections} 
        onDelete={deleteCollection} 
        onEdit = {setCollectionToUpdate}/> : null}
      </AsyncData>
      </div>
    </>
  );
}
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById } from "../../api";
import CollectionForm from '../../components/collections/CollectionsForm';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditCollection() {
  const { id } = useParams();


  const {
    data: collection,
    error: collectionError,
    isLoading: collectionLoading,
  } = useSWR(id ? `collections/${id}` : null, getById);


  return (
    <>
      <h1>
        Add a collection
      </h1>

      <AsyncData error={collectionError} loading={collectionLoading}>
        <CollectionForm collection = {collection}/>
      </AsyncData>
    </>
  );
}
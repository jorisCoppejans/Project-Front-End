import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './contexts/Theme.context.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CollectionList from './pages/collections/CollectionList.jsx';
import Layout from './components/Layout.jsx';
import NotFound from './components/NotFound.jsx';
import AddOrEditCollection from './pages/collections/AddOrEditCollection.jsx';
import AddOrEditCoin from './pages/coins/AddOrEditCoin.jsx';
import CoinForm from './components/coins/CoinForm.jsx';
import CollectionForm from './components/collections/CollectionsForm.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        children: [
          {index: true, element: <CollectionList />}
        ],
      },
      {
        path: '/collections',
        children: [
          {index: true, element: <CollectionForm />},
          {path: 'add', element: <AddOrEditCollection />},
          {path: 'edit/:id', element: <AddOrEditCollection />},
        ],
      },

      
      {
        path: '/coins',
        children: [
          {index: true, element: <CoinForm />},
          {path: 'add', element: <AddOrEditCoin />},
          {path: 'edit/:id', element: <AddOrEditCoin />}
        ]
      },


      {path: '*',element: <NotFound />},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)

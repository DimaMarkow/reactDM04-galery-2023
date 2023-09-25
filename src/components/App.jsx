import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from 'components/Header/Header';
import ContentInfo from './ContentInfo/ContentInfo';

import React from 'react';

const App = () => {
  // const [pictures, setPictures] = useState([]);
  const [filter, setFilter] = useState('');

  const onFilterChange = filterText => setFilter(filterText);

  return (
    <>
      <div className="container">
        <Header filterText={filter} onFilterChange={onFilterChange} />
        <ContentInfo searchText={filter} />
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;

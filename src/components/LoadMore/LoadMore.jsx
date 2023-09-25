// import { Component } from 'react';

import css from 'components/imageFinder.module.css';

import React from 'react';

const LoadMore = ({ onLoadMore }) => {
  return (
    <div className="container">
      <div className={css.ButtonLoadMore}>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={onLoadMore}
        >
          Load more...
        </button>
      </div>
    </div>
  );
};

export default LoadMore;

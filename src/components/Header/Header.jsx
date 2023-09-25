import { useState } from 'react';
import PropTypes from 'prop-types';

import React from 'react';

const Header = ({ filterText, onFilterChange }) => {
  const [filter, setFilter] = useState('');

  const handleChange = ({ target }) => setFilter(target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onFilterChange(filter);
    setFilter('');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="https://www.google.com/">
          Homework-DM-04-gallery with hooks
        </a>

        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            name="filter"
            placeholder="Search"
            aria-label="Search"
            value={filter}
            onChange={handleChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Header;

Header.propTypes = {
  showFeedback: PropTypes.func,
  showContacts: PropTypes.func,
};

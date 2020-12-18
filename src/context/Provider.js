import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  // const [filtersUpdated, setFiltersUpdated] = useState(false);
  const [filters, setFilters] = useState(
    {
      filterByName: { },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  );
  const [name, setName] = useState('');
  const [filterFields, setFilterFields] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [HEAD] = useState([
    'name',
    'diameter',
    'climate',
    'created',
    'edited',
    'films',
    'gravity',
    'orbital_period',
    'population',
    'rotation_period',
    'surface_water',
    'terrain',
    'url',
  ]);

  const contextValue = {
    planets,
    setPlanets,
    filteredPlanets,
    setFilteredPlanets,
    name,
    setName,
    filters,
    setFilters,
    filterFields,
    setFilterFields,
    HEAD,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.objectOf().isRequired,
};

export default Provider;

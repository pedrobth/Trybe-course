import React, { useContext, useState, useEffect, useRef } from 'react';
import AppContext from '../context/AppContext';

const dropDownFilterValues = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const HEAD = [
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
];

function Filter() {
  const {
    planets,
    setFilteredPlanets,
    filters,
    setFilters,
    setName,
    filterFields,
    setFilterFields,
  } = useContext(AppContext);

  const [chosenField, setChosenField] = useState(filterFields[0]);
  const [filtersUpdated, setFiltersUpdated] = useState(false);
  const [localPlanets, setLocalPlanets] = useState([]);
  const COMPONENT_DID_MOUNT = useRef();

  const ZERO = 0;

  const manageMultipleFilter = ({ column, comparison, value }, index) => {
    if (index === ZERO) {
      switch (comparison) {
      case 'maior que':
        setLocalPlanets(planets.filter((planet) => (
          Number(planet[column]) > Number(value)
          && planet[column] !== 'unknown')));
        break;
      case 'menor que':
        setLocalPlanets(planets.filter((planet) => (
          Number(planet[column]) < Number(value)
          && planet[column] !== 'unknown')));
        break;
      default:
        setLocalPlanets(planets.filter((planet) => (
          Number(planet[column]) === Number(value)
          && planet[column] !== 'unknown')));
      }
    } else {
      switch (comparison) {
      case 'maior que':
        setLocalPlanets(localPlanets.filter((planet) => (
          Number(planet[column]) > Number(value)
          && planet[column] !== 'unknown')));
        break;
      case 'menor que':
        setLocalPlanets(localPlanets.filter((planet) => (
          Number(planet[column]) < Number(value)
          && planet[column] !== 'unknown')));
        break;
      default:
        setLocalPlanets(localPlanets.filter((planet) => (
          Number(planet[column]) === Number(value)
          && planet[column] !== 'unknown')));
      }
    }
    setFiltersUpdated(!filtersUpdated);
  };

  useEffect(() => {
    setFilteredPlanets(localPlanets);
  }, [localPlanets]);

  useEffect(() => {
    if (COMPONENT_DID_MOUNT.current) {
      setFilters((prev) => ({
        filterByName: { ...prev.filterByName },
        filterByNumericValues: prev.filterByNumericValues.concat({
          column: filterFields[0],
          comparison: 'maior que',
          value: 0,
        }),
        order: { ...prev.order },
      }));
      COMPONENT_DID_MOUNT.current = true;
      filters.map((filter, index) => manageMultipleFilter(filter, index));
    }
  }, [filtersUpdated]);

  useEffect(() => {
    const { filterByName, filterByNumericValues, order } = filters;
    setChosenField(filterFields[0]);
    if (filterByNumericValues.length > ZERO
      || filterByName.length > ZERO
      || order.sort !== ''
    ) {
      filterByNumericValues.map((filter, index) => (
        manageMultipleFilter(filter, index)
      ));
      setFiltersUpdated(!filtersUpdated);
    } else {
      console.log('filteredPlanets = []');
      setFilteredPlanets([]);
    }
  }, [filterFields]);

  const [localColumn, setLocalColumn] = useState('name');
  const [localSort, setLocalSort] = useState('ASC');

  const COMPARISON_TYPE = ['maior que', 'menor que', 'igual a'];
  const [chosenComparison, setChosenComparison] = useState('maior que');
  const [chosenValue, setChosenValue] = useState(ZERO);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'name') {
      setName(value);
    }
  };

  const manageFilter = () => {
    if (chosenValue !== ZERO && filterFields.includes(chosenField)) {
      const chosenFilter = {
        column: chosenField,
        comparison: chosenComparison,
        value: chosenValue,
      };
      setFilters((prev) => ({
        ...prev.filterByName,
        order: { ...prev.order },
        filterByNumericValues: [...prev.filterByNumericValues, chosenFilter],
      }));
      setFilterFields(filterFields.filter((field) => chosenField !== field));
    }
    setFiltersUpdated(!filtersUpdated);
  };

  useEffect(() => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length > ZERO) {
      filterByNumericValues.map((filter, index) => manageMultipleFilter(filter, index));
    } else {
      setFilteredPlanets([]);
    }
  }, [filters]);

  const removeFilter = ({ column }) => {
    setFilters((prev) => ({ ...prev,
      ...prev,
      filterByNumericValues: filters.filterByNumericValues
        .filter((field) => field.column !== column),
    }));
  };

  const filterField = ({ target }) => {
    setChosenField(target.value);
  };

  const filterComparison = ({ target }) => {
    setChosenComparison(target.value);
  };

  const filterValue = ({ target }) => {
    setChosenValue(target.value);
  };

  const dropdownOption = (type) => (
    <option
      id={ type }
      name={ type }
      value={ type }
      key={ `${type}` }
    >
      { type }
    </option>
  );

  const updateSort = () => {
    setFilters((prev) => ({
      ...prev,
      order: {
        column: localColumn,
        sort: localSort,
      },
    }));
    setFiltersUpdated(!filtersUpdated);
  };

  return (
    <div key="filter-main-tag">
      <form>
        <label htmlFor="name">
          Name
          <input
            data-testid="name-filter"
            id="name"
            name="name"
            type="text"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <select
          data-testid="column-filter"
          value={ chosenField }
          onChange={ (e) => filterField(e) }
        >
          { dropDownFilterValues.filter((options) => !filters.filterByNumericValues
            .map((c) => c.column).includes(options))
            .map((field) => dropdownOption(field)) }
        </select>
        <select
          data-testid="comparison-filter"
          value={ chosenComparison }
          onChange={ (e) => filterComparison(e) }
        >
          {COMPARISON_TYPE.map((type, index) => dropdownOption(type, index))}
        </select>
        <label htmlFor="value">
          Value
          <input
            data-testid="value-filter"
            id="value"
            name="value"
            type="number"
            onChange={ (e) => filterValue(e) }
          />
        </label>
        <button
          type="button"
          onClick={ (e) => manageFilter(e) }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      { filters.filterByNumericValues.length > ZERO
        && filters.filterByNumericValues
          .map((filter) => (
            <div
              className="filter"
              data-testid="filter"
              key={ filter.column }
            >
              { filter.column }
              <button
                type="button"
                onClick={ () => removeFilter(filter) }
              >
                x
              </button>
            </div>
          ))}
      <select
        data-testid="column-sort"
        value={ localColumn }
        onChange={ (e) => setLocalColumn(e.target.value) }
      >
        { HEAD.map((column) => dropdownOption(column)) }
      </select>
      <div>
        <label
          htmlFor="column-sort-input-asc"
        >
          Ascendente
          <input
            onChange={ (e) => setLocalSort(e.target.value) }
            type="radio"
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            name="column-sort-input"
            value="ASC"
          />
        </label>
        <label
          htmlFor="column-sort-input-dsc"
        >
          Descendente
          <input
            onChange={ (e) => setLocalSort(e.target.value) }
            type="radio"
            data-testid="column-sort-input-desc"
            id="column-sort-input-dsc"
            name="column-sort-input"
            value="DSC"
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ updateSort }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Filter;

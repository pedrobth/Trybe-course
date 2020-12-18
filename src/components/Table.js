import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import sWAPI from '../services/sWAPI';
import Filter from './Filter';
import TableRow from './TableRow';

function Table() {
  const {
    planets,
    setPlanets,
    filteredPlanets,
    name,
    HEAD,
    filters,
  } = useContext(AppContext);

  const dropDownFilterValues = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const ZERO = 0;

  const headElement = () => HEAD.map((e) => (
    <th key={ e }>{ e }</th>));

  const PLANETS_FROM_API = async () => {
    const RESULT = await sWAPI();
    setPlanets(RESULT);
  };

  const sortTable = (a, b) => {
    const { column, sort } = filters.order;
    if (sort === 'ASC') {
      return (
        dropDownFilterValues.includes(column)
          ? parseInt(a[column], 10) - parseInt(b[column], 10)
          : a[column].localeCompare(b[column])
      );
    }
    return (
      dropDownFilterValues.includes(column)
        ? parseInt(b[column], 10) - parseInt(a[column], 10)
        : b[column].localeCompare(a[column])
    );
  };

  const tableFilterStructure = () => (
    filteredPlanets.length > ZERO
      ? filteredPlanets
        .sort(sortTable)
        .map((planet) => TableRow(planet, HEAD))
      : planets
        .sort(sortTable)
        .filter((planet) => planet.name.includes(name))
        .map((planet) => TableRow(planet, HEAD))
  );

  useEffect(() => {
    PLANETS_FROM_API();
  }, []);

  return (
    <div>
      <Filter />
      {planets.length !== ZERO
        ? (
          <table>
            <thead>
              <tr>
                { headElement() }
              </tr>
            </thead>
            <tbody>
              {tableFilterStructure()}
            </tbody>
          </table>
        )
        : <h1>Loading</h1>}
    </div>
  );
}

export default Table;

import { useState, useEffect } from 'react';

const usePlanets = () => {
  const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const ZERO = 0;
  useEffect(() => {
    async function fetchData() {
      if (planets.length !== ZERO) {
        const results = await fetch(URL_API)
          .then((response) => (response.json())
            .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)
            )));
        setPlanets(results);
      }
    }
    fetchData();
  }, [planets]);
};

export default usePlanets;

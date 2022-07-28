import { useEffect, useState } from 'react';

import Pokemon from '../interfaces/Pokemon';

export default function MainPage() {
  const zeni: number = 30000;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  function api(url: string) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
  }

  useEffect(() => {
    function getPokemonDetails(url: string) {
      api(url).then((item) => setPokemons((prevState) => [...prevState, item]));
    }
    api('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then((data) => {
        data.results.map((elem: { url: string }) => getPokemonDetails(elem.url));
      });
  }, []);

  return (
    <>
      <h1>Welcome to Janos&apos; Pokemon Shop</h1>
      <p>
        Currently you have&nbsp;
        <strong>
          {zeni}
        </strong>
        &nbsp;Zeni.
      </p>
      {pokemons.map((i) => (
        <div
          key={i.id}
        >
          <h4>
            {i.name.charAt(0).toUpperCase() + i.name.substring(1).toLowerCase()}
          </h4>
          <img
            src={i.sprites.front_default}
            alt={i.name}
          />
          <p>
            Price:&nbsp;
            {i.weight * 100}
            &nbsp;zeni
          </p>
        </div>
      ))}
    </>
  );
}

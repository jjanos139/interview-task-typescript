import { useEffect, useState } from 'react';

import Pokemon from '../interfaces/Pokemon';
import Card from './Card';
import Top from './Top';

export default function MainPage() {
  const [zeni, setZeni] = useState<number>(100000);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pocket, setPocket] = useState<Pokemon[]>([]);
  const [pocketValue, setPocketValue] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [addition, setAddition] = useState<number>(0);

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
      <Top
        zeni={zeni}
        addition={addition}
        updateAddition={setAddition}
        changeZeni={setZeni}
        pocketValue={pocketValue}
        pocket={pocket}
        message={message}
      />
      <Card
        zeni={zeni}
        pokemons={pokemons}
        changeZeni={setZeni}
        changePocketValue={setPocketValue}
        pocket={pocket}
        changePocket={setPocket}
        changeMessage={setMessage}
      />
    </>
  );
}

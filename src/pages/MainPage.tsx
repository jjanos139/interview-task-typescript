import { ChangeEvent, useEffect, useState } from 'react';

import Pokemon from '../interfaces/Pokemon';

export default function MainPage() {
  const [zeni, setZeni] = useState<number>(300000);
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

  function handleClick(price: number, pokemon: Pokemon): void {
    if (zeni >= price) {
      setZeni((prevZeni) => prevZeni - price);
      setPocketValue((prevPocketValue) => prevPocketValue + price);
      setPocket((prevPocket) => [...prevPocket, pokemon]);
      setMessage(`You have just added: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase()}!`);
    } else {
      setMessage("You don't have enough money to buy this pokemon.");
    }
  }

  function buyZeni() {
    setZeni((prevZeni) => prevZeni + addition);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddition(parseInt(event.target.value, 10));
  }

  return (
    <>
      <h1>Welcome to Janos&apos; Pokemon Shop</h1>
      {
        zeni > 0
          ? (
            <div>
              <p>
                Currently you have&nbsp;
                <strong>
                  {zeni.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </strong>
              </p>
              {
                zeni < 10000
                  ? (
                    <strong
                      className="message"
                    >
                      LOW MONEY
                    </strong>
                  )
                  : ''
              }
            </div>
          )
          : (
            <p>
              You don&apos;t have more money Add some now!
            </p>
          )
      }
      <div
        className="input-container"
      >
        <input
          type="number"
          className="input"
          min={0}
          max={1000000}
          step={100}
          onChange={(event) => handleChange(event)}
        />
        <button
          className="add-money"
          type="button"
          onClick={buyZeni}
        >
          Add Money
        </button>
      </div>
      {
        pocketValue === 0
          ? (
            <h3>
              Your pocket is empty.
            </h3>
          )
          : (
            <div>
              <h3>
                Pocket value:&nbsp;
                {pocketValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </h3>
              <h3>
                Your pocket contains:&nbsp;
                {
                  pocket.map((item) => item.name.charAt(0).toUpperCase() + item.name.substring(1).toLowerCase()).join(', ')
                }
              </h3>
              <h3
                className="message"
              >
                {message}
              </h3>
            </div>
          )
      }
      <div
        className="container"
      >
        {pokemons.map((i) => (
          <div
            key={i.id}
            className="card"
          >
            <h4
              className="pokemon-name"
            >
              {i.name.charAt(0).toUpperCase() + i.name.substring(1).toLowerCase()}
            </h4>
            <img
              src={i.sprites.front_default}
              alt={i.name}
            />
            <p>
              Price:&nbsp;
              {(i.weight * 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleClick(i.weight * 100, i)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

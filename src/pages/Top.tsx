import { ChangeEvent } from 'react';

import Pokemon from '../interfaces/Pokemon';
import TopProps from '../interfaces/TopProps';

export default function Top(props: TopProps) {
  const {
    zeni, addition, updateAddition, changeZeni, pocketValue,
    pocket, message, pokemons, changeFilteredPokemons,
  } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    updateAddition(parseInt(event.target.value, 10));
  }

  function buyZeni(): void {
    changeZeni((prevZeni) => prevZeni + addition);
  }

  function filter(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value.toLowerCase();
    let result: Pokemon[] = [];
    result = pokemons.filter((item) => item.name.toLowerCase().search(value) !== -1);
    setTimeout(() => changeFilteredPokemons(result), 1000);
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
              You don&apos;t have more money. Add some now!
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
          placeholder="Add money"
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
                Your pocket contains these Pokemon:&nbsp;
                {pocket.map((item) => item.name.charAt(0)
                  .toUpperCase() + item.name.substring(1).toLowerCase())
                  .join(', ')}
              </h3>
              <h3
                className="message"
              >
                {message}
              </h3>
            </div>
          )
      }
      <div>
        <input
          type="text"
          placeholder="filter"
          onChange={(event) => filter(event)}
          className="input"
        />
      </div>
    </>
  );
}

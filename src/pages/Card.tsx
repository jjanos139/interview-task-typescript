import CardProps from '../interfaces/CardProps';
import Pokemon from '../interfaces/Pokemon';

export default function Card(props: CardProps) {
  const {
    zeni, pokemons, changeZeni, changePocketValue, pocket, changePocket, changeMessage,
  } = props;

  function handleClick(price: number, pokemon: Pokemon): void {
    if (zeni >= price) {
      changeZeni((prevZeni) => prevZeni - price);
      changePocketValue((prevPocketValue) => prevPocketValue + price);
      if (!pocket.includes(pokemon)) {
        changePocket((prevPocket) => [...prevPocket, pokemon]);
      }
      changeMessage(`You have just added: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase()}!`);
    } else {
      changeMessage("You don't have enough money to buy this pokemon.");
    }
  }

  return (
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
            src={i.sprites.other.dream_world.front_default}
            alt={i.name}
            width={100}
            height={100}
          />
          <p
            className="price"
          >
            Now:&nbsp;
            {(i.weight * 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
          <p
            className="sale"
          >
            Was:&nbsp;
            {(i.weight * 103).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </p>
          <p
            className="stats"
          >
            <i
              className="fa-solid fa-bolt-lightning"
            />
            &nbsp;-&nbsp;
            {i.stats[1].base_stat}
          </p>
          <p
            className="stats"
          >
            <i
              className="fa-solid fa-shield-halved"
            />
            &nbsp;-&nbsp;
            {i.stats[2].base_stat}
          </p>
          <p
            className="stats"
          >
            <i
              className="fa-solid fa-gauge-high"
            />
            &nbsp;-&nbsp;
            {i.stats[5].base_stat}
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
  );
}

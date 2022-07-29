import { Dispatch, SetStateAction } from 'react';

import Pokemon from './Pokemon';

export default interface CardProps {
  zeni: number,
  pokemons: Pokemon[],
  changeZeni: Dispatch<SetStateAction<number>>,
  changePocketValue: Dispatch<SetStateAction<number>>,
  pocket: Pokemon[],
  changePocket: Dispatch<SetStateAction<Pokemon[]>>,
  changeMessage: Dispatch<SetStateAction<string>>
}

import { Dispatch, SetStateAction } from 'react';

import Pokemon from './Pokemon';

export default interface TopProps {
  zeni: number,
  addition: number;
  updateAddition: Dispatch<SetStateAction<number>>,
  changeZeni: Dispatch<SetStateAction<number>>,
  pocketValue: number,
  pocket: Pokemon[],
  message: string
}

import { ChangeEvent } from 'react';

import TopProps from '../interfaces/TopProps';

export default function Top(props: TopProps) {
  const {
    zeni, addition, updateAddition, changeZeni, pocketValue, pocket, message,
  } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateAddition(parseInt(event.target.value, 10));
  }

  function buyZeni() {
    changeZeni((prevZeni) => prevZeni + addition);
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
    </>
  );
}

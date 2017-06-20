import * as React from 'react';

import './styles/MoneyCounter.css';

interface Props { money: number; }
export const MoneyCounter = ({ money }: Props) => {
  return (
    <div className="money-display">
      <h1 id="money-header">${money.toFixed(2)}</h1>
    </div>
  );
};
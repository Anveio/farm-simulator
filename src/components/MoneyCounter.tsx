import * as React from "react";


interface MoneyCounterProps { money: number }
export const MoneyCounter = (props: MoneyCounterProps) => {
  return (
    <div className="money-display">
      <h1 id="money-header">${props.money.toFixed(2)}</h1>
    </div>
  )
}
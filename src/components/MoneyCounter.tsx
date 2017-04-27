import * as React from "react";


interface MoneyCounterProps { money: number }
export const MoneyCounter = (props: MoneyCounterProps) => {
  return (
    <div className="money-display">
      <h3>{props.money}</h3>
    </div>
  )
}
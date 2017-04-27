import * as React from "react";

interface MoneyCounterProps { money: number }
export default class MoneyCounter extends React.Component<MoneyCounterProps, never> {
  constructor(props:MoneyCounterProps){
    super(props)
  }

  


  render() {
    return(
      <div className="money-display">
        <h3>{this.props.money}</h3>
      </div>
    )
  }
}
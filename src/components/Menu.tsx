import * as React from "react";
import { MoneyCounter } from "./MoneyCounter";
import FarmInfo from "../classes/farmInfo";
import { FarmMenuCard } from "./FarmMenuCard";


interface MenuProps { money: number; selectedFarmInfo: FarmInfo | null}
export default class Menu extends React.Component<MenuProps, never> {
  farmSelection = () => {
    if (this.props.selectedFarmInfo) {
      return(
        <FarmMenuCard selectedFarmInfo={this.props.selectedFarmInfo} />
      )
    } else {
      return ( <div className="farm-info"><h3>No Tile Selected</h3></div> )
    }
  }

  render() {
    return (
      <div className="menu-column">
        <div className="menu">
          <MoneyCounter money={this.props.money} />
          <div id="menu-title"><h2> Menu </h2> </div>
          {this.farmSelection()}
        </div>
      </div>
    )
  }
}
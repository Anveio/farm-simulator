import * as React from "react";
import { MoneyCounter } from "./MoneyCounter";
import FarmInfo from "../classes/farmInfo";


interface MenuProps { money: number; selectedFarmInfo: FarmInfo | null}
export default class Menu extends React.Component<MenuProps, never> {
  farmSelection = () => {
    if (this.props.selectedFarmInfo !== null) {
      return(
        <div className="farm-info">    
          <p>Farm #: {this.props.selectedFarmInfo.farmID}</p>
          <p>Owner: {this.props.selectedFarmInfo.farmer.name}</p>
          <p>"{this.props.selectedFarmInfo.farmer.quote}" </p>
          <p>Farm Efficiency: {this.props.selectedFarmInfo.efficiency}</p>
        </div>  
      )
    } else {
      return ( <div className="farm-info"><h3>No Tile Selected</h3></div> )
    }
  }

  render() {
    return (
      <div className="menu-column">
        <div className="menu">
          <h2 id="menu-title"> Menu </h2>
          <MoneyCounter money={this.props.money} />
          {this.farmSelection()}
        </div>
      </div>
    )
  }
}

/*const FarmInfoTab = (props: {farmInfo: FarmInfo}) => {
  const determineInfoText = ():any => {
    let infoText: any;
    if (props.farmInfo) {
      this.infoText = (
        <div>
          <p>{props.farmInfo.farmID}</p>
          <p>{props.farmInfo.farmer.name}</p>
          <p>{props.farmInfo.farmer.quote}</p>
        </div>
      )
    } else {
      infoText = 
        <div> <h3>No Farm Selected</h3> </div>
    }

    return infoText;
  }

  return (
    {determineInfoText}
  )
}*/
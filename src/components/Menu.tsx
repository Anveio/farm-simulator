import * as React from "react";
import { MoneyCounter } from "./MoneyCounter";
import FarmInfo from "../classes/farmInfo";


interface MenuProps { money: number; selectedFarmInfo: FarmInfo | null}
export default class Menu extends React.Component<MenuProps, any> {
  farmSelection = () => {
    if (this.props.selectedFarmInfo !== null) {
      return(
        <div>    
          <p>Farm #: {this.props.selectedFarmInfo.farmID}</p>
          <p>Owner: {this.props.selectedFarmInfo.farmer.name}</p>
          <p>"{this.props.selectedFarmInfo.farmer.quote}" </p>
        </div>  
      )
    } else {
      return ( <h3>No Tile Selected</h3> )
    }
  }

  render() {
    return (
      <div className="menu-column">
        <h2 id="menu-title"> Menu </h2>
        <MoneyCounter money={this.props.money} />
        <div>
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
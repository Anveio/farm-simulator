import * as React from "react";

import Menu from "./Menu";
import FarmGrid from "./FarmGrid";
import FarmInfo from "../classes/farmInfo";


export default class App extends React.Component<never, never> {
  render() {
    return (
      <div>
        <nav className="navbar"> Farm Simulator </nav>
        <Game />

      </div>
    )  
  }
}


interface GameState { money: number; selectedFarmInfo: FarmInfo | null }
class Game extends React.Component<never, GameState> {
  constructor(props: never) {
    super(props)
    this.state = {
      money: 99999999,
      selectedFarmInfo: null
    }
  }

  handleIncomingRevenue = (revenue: number): void => {
    this.setState(prevState => {
      return { money: prevState.money + revenue }
    })
  }

  handleFarmPurchaseAttempt = (farmCost: number): boolean => {
    return (this.state.money >= farmCost)
  }

  deductFarmCost = (farmCost: number): void => {
    this.setState(prevState => {
      return { money: prevState.money - farmCost }
    })
  }

  handleFarmSelection = (farmInfo: FarmInfo): void => {
    this.setState({ selectedFarmInfo: farmInfo })
  }

  render() {
    return (
      <div className="app-container">
        <div className="game-column">
          <div className="game-container">
            <div id="game-title-container">
              <h1 id="game-title"> Farm Simulator </h1>
            </div>
            <div className="farm-grid">
              <FarmGrid 
                onFarmGrowthFinish={this.handleIncomingRevenue} 
                onFarmPurchase={this.handleFarmPurchaseAttempt}
                onFarmPurchaseVerification={this.deductFarmCost}
                onFarmSelection={this.handleFarmSelection} />
            </div>
          </div>
        </div>
        <Menu 
          money={this.state.money}
          selectedFarmInfo={this.state.selectedFarmInfo} />
      </div>
    )
  }
}

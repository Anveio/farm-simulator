import * as React from "react";

import Menu from "./Menu";
import Farm from "./Farm";
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
      money: 10000000000,
      selectedFarmInfo: null
    }
  }

  handleIncomingRevenue = (revenue: number): void => {
    this.setState(prevState => {
      return { money: prevState.money + revenue }
    })
  }

  handleFarmPurchase = (farmCost: number): boolean => {
    const completeFarmPurchase = (): void => {
      this.setState(prevState => {
        return { money: prevState.money - farmCost }
      })
    }

    if (this.state.money >= farmCost) {
      completeFarmPurchase();
      return true;
    } else {
      return false;
    }
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
                onFarmPurchase={this.handleFarmPurchase}
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

interface FarmGridProps { 
  onFarmGrowthFinish(revenue: number): void; 
  onFarmPurchase(currentFarmCount: number): boolean; 
  onFarmSelection(farmInfo: FarmInfo): void; 
}

class FarmGrid extends React.Component<FarmGridProps, { farms: number } > {
  constructor(props: FarmGridProps) {
    super(props)
    this.state = {
      farms: 35
    }
  }

  handleFarmGrowthBarFinish = (revenue: number): void => {
    this.props.onFarmGrowthFinish(revenue);
  }

  handleFarmSelection = (farmInfo: FarmInfo): void => {
    this.props.onFarmSelection(farmInfo);
  }

  buildFarmGrid = (farmsToCreate: number):JSX.Element[] => {
    let createdFarms: JSX.Element[] = [];

    for(let i = 0; i < farmsToCreate; i++) {
      createdFarms.push(
        <li key={i.toString()} className="farm-li">
          <Farm 
            key={i.toString()}
            farmID={(i + 1).toString()}
            onFarmGrowthBarFinish={this.handleFarmGrowthBarFinish}
            onSelection={this.handleFarmSelection} />
        </li>
      )
    }
    return createdFarms
  }

  calculateFarmCost = (): number => {
    const baseCost: number = 720;
    const coEf: number = 1.550;

    return (baseCost * (Math.pow(coEf, this.state.farms)));
  }

  

  addFarmToFarmGrid = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Maybe not necessary

    if (this.props.onFarmPurchase(this.calculateFarmCost()) === true) {
      this.setState(prevState => {
        return { farms: prevState.farms += 1 }
      })
    }
  }

  render() {
    const formattedFarmCost = () => {
      let short = this.calculateFarmCost().toPrecision(3)
      return parseFloat(short).toExponential();
    }

    return (
      <ul className="farm-ul">
        {this.buildFarmGrid(this.state.farms)}
        <li className="farm-li add-farm-li"> 
          <button 
            className="farm add-farm-btn" 
            onClick={this.addFarmToFarmGrid}>
            {formattedFarmCost()}</button> </li>
      </ul>
    )
  }
}
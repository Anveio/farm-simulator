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
      money: 350,
      selectedFarmInfo: null
    }
  }

  handleIncomingRevenue = (revenue: number): void => {
    this.setState(prevState => {
      return { money: prevState.money + revenue }
    })
  }

  handleFarmPurchaseAttempt = (farmCost: number): boolean => {
    if (this.state.money >= farmCost) {
      return true;
    } else {
      return false;
    }
  }

  completeFarmPurchase = (farmCost: number): void => {
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
                onFarmPurchaseCompletion={this.completeFarmPurchase}
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
  onFarmPurchase(farmCost: number): boolean;
  onFarmPurchaseCompletion(farmCost: number): void;
  onFarmSelection(farmInfo: FarmInfo): void; 
}

class FarmGrid extends React.Component<FarmGridProps, { farms: number } > {
  constructor(props: FarmGridProps) {
    super(props)
    this.state = {
      farms: 0
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
    const baseCost: number = 350;
    const coEf: number = 1.65;

    return (baseCost * (Math.pow(coEf, this.state.farms)));
  }

  addFarmToFarmGrid = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Maybe not necessary
    const farmCost = this.calculateFarmCost()

    if (this.props.onFarmPurchase(farmCost) === true && this.state.farms < 25) {
      this.props.onFarmPurchaseCompletion(farmCost);
      this.setState(prevState => {
        return { farms: prevState.farms += 1 }
      })
    }
  }

  render() {
    const formattedFarmCost = () => {
      const cost = this.calculateFarmCost();
      const formatLargeNum = (cost: number): string => {
        let short = cost.toPrecision(3)
        return parseFloat(short).toExponential();
      }

      const formatSmallNum = (cost: number): string => {
        console.log("small num detected")
        return parseFloat(cost.toPrecision(3)).toFixed(0);
      }

      return (cost > parseFloat('1e6')) ? formatLargeNum(cost) : formatSmallNum(cost);      
    }

    const farmLimitReached = () => {
      return (this.state.farms < 25)
    }

    return (
      <ul className="farm-ul">
        {this.buildFarmGrid(this.state.farms)}
        <li className="farm-li add-farm-li"> 
          <button 
            className="farm add-farm-btn"
            disabled={!farmLimitReached()} 
            onClick={this.addFarmToFarmGrid}
          >
            {formattedFarmCost()}
          </button> 
        </li>
      </ul>
    )
  }
}
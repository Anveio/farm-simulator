import * as React from "react";

import Menu from "./Menu";
import Farm from "./Farm";


export default class App extends React.Component<never, never> {
  render() {
    return (
      <div>
        <Game />
      </div>
    )  
  }
}


interface GameState { money: number; currentlySelectedFarm: JSX.Element | null }
class Game extends React.Component<never, GameState> {
  constructor(props: never){
    super(props)
    this.state = {
      money: 10000,
      currentlySelectedFarm: null
    }
  }

  handleIncomingHarvest = (): void => {
    this.setState(prevState => {
      return { money: prevState.money + 1 }
    })
  }

  handleFarmPurchase = (): boolean => {
    const completeFarmPurchase = (): void => {
      this.setState(prevState => {
        return { money: prevState.money - 100 }
      })
    }

    if (this.state.money >= 100) {
      completeFarmPurchase();
      return true;
    } else {
      return false;
    }
  }

  handleFarmSelection = (farm: JSX.Element): void => {
    this.setState({ currentlySelectedFarm: farm })
  }

  render() {
    return (
      <div className="app-container">
        <div className="game-column">
          <div className="game-container">
            <h1> Farm Simulator </h1>
            <div className="farm-grid">
              <FarmGrid 
                onFarmReadyForHarvest={this.handleIncomingHarvest} 
                onFarmPurchase={this.handleFarmPurchase}
                onFarmSelection={this.handleFarmSelection} />
            </div>
          </div>
        </div>
        <Menu 
          money={this.state.money}
          currentlySelectedFarm={this.state.currentlySelectedFarm} />
      </div>
    )
  }
}

interface FarmGridProps { onFarmReadyForHarvest: any; onFarmPurchase: any; onFarmSelection: any; }
class FarmGrid extends React.Component<FarmGridProps, { farms: number } > {
  constructor(props: FarmGridProps){
    super(props)
    this.state = {
      farms: 5
    }
  }

  handleFarmGrowthBarFinish = (): void => {
    this.props.onFarmReadyForHarvest();
  }

  handleFarmSelection = (farm: JSX.Element): void => {
    this.props.onFarmSelection(farm);
  }

  buildFarmGrid = (farmsToCreate: number):JSX.Element[] => {
    let createdFarms: JSX.Element[] = [];

    for(let i = 0; i < farmsToCreate; i++) {
      createdFarms.push(
        <li key={i.toString()}>
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

  addFarmToFarmGrid = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Maybe not necessary

    if (this.props.onFarmPurchase() === true) {
      this.setState(prevState => {
        return { farms: prevState.farms += 1 }
      })
    }
  }

  render() {
    return (
      <ul className="farm-ul">
        {this.buildFarmGrid(this.state.farms)}
        <li className="add-farm-li"> 
          <button 
            className="farm add-farm-btn" 
            onClick={this.addFarmToFarmGrid}>
            +</button> </li>
      </ul>
    )
  }
}
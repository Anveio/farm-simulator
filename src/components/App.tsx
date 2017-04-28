import * as React from "react";

import Menu from "./Menu";
import Tile from "./Tile";


export default class App extends React.Component<never, never> {
  render() {
    return (
      <div>
        <Game />
      </div>
    )  
  }
}


class Game extends React.Component<never, { money: number }> {
  constructor(props: never){
    super(props)
    this.state = {
      money: 10000
    }
  }

  handleIncomingHarvest = ():void => {
    this.setState(prevState => {
      return { money: prevState.money + 1 }
    })
  }

  handleTilePurchase = ():boolean => {
    const completeTilePurchase = ():void => {
      this.setState(prevState => {
        return { money: prevState.money - 100 }
      })
    }

    if (this.state.money >= 100) {
      completeTilePurchase();
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="game-column">
          <div className="game-container">
            <h1> Farm Simulator </h1>
            <div className="farm">
              <Farm 
                onTileReadyForHarvest={this.handleIncomingHarvest} 
                onTilePurchase={this.handleTilePurchase}/>
            </div>
          </div>
        </div>
        <Menu money={this.state.money}/>
      </div>
    )
  }
}

interface FarmProps { onTileReadyForHarvest: any; onTilePurchase: any; }
class Farm extends React.Component<FarmProps, { tiles: number } > {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      tiles: 5
    }
  }

  handleTileGrowthCompletion = ():void => {
    this.props.onTileReadyForHarvest();
  }

  createFarmGrid = ( tilesToCreate: number ):JSX.Element[] => {
    let createdTiles = [];

    for(let i = 0; i < tilesToCreate; i++) {
      createdTiles.push(
        <li key={i.toString()}>
          <Tile 
            key={i.toString()}
            tileID={i.toString()}
            onTileGrowthFinish={this.handleTileGrowthCompletion} />
        </li>
      )
    }

    return createdTiles
  }

  addTileToFarm = (e: React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault(); // Maybe not necessary

    if (this.props.onTilePurchase() === true) {
      this.setState(prevState => {
        return { tiles: prevState.tiles += 1 }
      })
    }
  }

  render() {
    return (
      <ul className="tile-ul">
        {this.createFarmGrid(this.state.tiles)}
        <li className="add-tile-li"> 
          <button 
            className="tile add-tile-btn" 
            onClick={this.addTileToFarm}>
            +</button> </li>
      </ul>
    )
  }
}
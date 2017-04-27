import * as React from "react";
import { MoneyCounter } from "./MoneyCounter";

export default class App extends React.Component<never, never> {
  render() {
    return(
      <div>
        <Game />
      </div>
    )  
  }
}

class MouseData { 
  constructor(readonly hovering: boolean, readonly  mouseDown: boolean) {} 
}

class Game extends React.Component<never, { money: number }> {
  constructor(props: never){
    super(props)
    this.state = {
      money: 0
    }
  }

  handleIncomingHarvest = ():void => {
    this.setState(prevState => {
      return { money: prevState.money + 1 }
    })
  }

  handleTilePurchase = ():void => {
    this.setState(prevState => {
      return { money: prevState.money - 100 }
    })
  }

  render() {
    return (
      <div className="app-container">
        <div className="game-column">
          <div className="game-container">
            <MoneyCounter money={this.state.money} />
            <div className="farm">
              <Farm 
                onTileReadyForHarvest={this.handleIncomingHarvest} 
                onTilePurchase={this.handleTilePurchase}/>
            </div>
          </div>
        </div>
        <div className="menu-column">
          <h3> Game Menu </h3>
        </div>
      </div>
    )
  }
}

interface FarmProps { onTileReadyForHarvest: any; onTilePurchase: any; }
class Farm extends React.Component<FarmProps, { tiles: number } > {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      tiles: 1
    }
  }

  handleTileGrowthFinish = ():void => {
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
            onTileGrowthFinish={this.handleTileGrowthFinish} />
        </li>
      )
    }

    return createdTiles
  }

  addTileToFarm = ():void => {
    this.props.onTilePurchase();

    this.setState(prevState => {
      return { tiles: prevState.tiles += 1 }
    })
  }

  render() {
    return (
      <ul className="tile-ul">
        {this.createFarmGrid(this.state.tiles)}
        <li className="add-tile-li"> <button className="add-tile-btn" onClick={this.addTileToFarm}>+</button> </li>
      </ul>
    )
  }
}

interface TileProps { tileID: string; onTileGrowthFinish: any}
class Tile extends React.Component<TileProps, MouseData> {
  constructor(props: any){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
  }

  sendGrowthFinishUpstream = ():void => {
    this.props.onTileGrowthFinish();
  }

  calculateTileGrowthRate = (mouseData: MouseData):number => {
    let newTileGrowthRate: number = 1;

    if (!mouseData.hovering){
      newTileGrowthRate = 1;
    } else if (mouseData.mouseDown){
      newTileGrowthRate = 4;
    } else if (mouseData.hovering) {
      newTileGrowthRate = 2;
    }
    return newTileGrowthRate;
  }

  handleMouseEnter = ():void => {
    this.setState({
      hovering: true
    })
  }

  handleMouseLeave = ():void => {
    this.setState({
      hovering: false
    })
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>):void => {
    e.preventDefault
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = ():void => {
    this.setState({
      mouseDown: false
    })
  }

  render() {
    return (
      <div 
        className="tile" 
        id={"tile-" + this.props.tileID}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}>
        <TileGrowth 
          gpID={this.props.tileID}
          growthRate={this.calculateTileGrowthRate(this.state)}
          onGrowthFinish={this.sendGrowthFinishUpstream}
        />
      </div>
    )
  }
}

interface TileGrowthProps { gpID: string; growthRate: number; onGrowthFinish: any }
class TileGrowth extends React.Component<TileGrowthProps, { progress: number }> {
  constructor(props: any){
    super(props)
    this.state = {
      progress: 0,
    }
  }

  tickRate: number = 50;

  ticker: any;
  componentDidMount():void {
    this.ticker = setInterval(() => { this.tick(); }
    , this.tickRate)
  }

  componentWillReceiveProps(nextProps: TileGrowthProps) {
    process.nextTick(() => {
      clearInterval(this.ticker)
      this.ticker = setInterval(() =>
        this.tick(nextProps.growthRate), 
        this.tickRate
      )
    })
  }

  tick(growthMultiplier:number = 1):void {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState({
        progress: 0,
      })
    }

    this.setState(prevState => {
      return { 
        progress: Math.min(Math.max(prevState.progress + (1 * growthMultiplier), 1), 100),
      }
    })
  }

  calculateDimensions = () => {
    let width
    
    if(this.state.progress >= 100) {
      width = '100%';
    } else {
      width = `${this.state.progress}%`
    }

    return {
      width: width,
      height: '100%' 
    } 
  }

  render() {
    return (
      <span 
        id={'gp-' + this.props.gpID} 
        className="tile-growth-progress" 
        style={this.calculateDimensions()} > 
      </span>
    )
  }
}
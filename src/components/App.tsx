import * as React from "react";
// import MoneyCounter from "./MoneyCounter";

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

class Game extends React.Component<never, never> {
  render() {
    return(
      <div className="game-container">
        <div className="farm">
          <Farm farmRows={5} farmColumns={5}/>
        </div>
      </div>
    )
  }
}



interface FarmProps { farmColumns: number; farmRows: number; }
class Farm extends React.Component<FarmProps, never> {
  constructor(props: FarmProps){
    super(props)
  }

  createFarmGrid = (columns: number, rows: number ):JSX.Element[] => {
    let row = [];
    let farmGrid = [];

    for(let x = 0; x < columns; x++) {
      for(let y = 0; y < rows; y++) {
        row.push(
          <li key={[x, y].toString()}><Tile tileID={[x, y].toString()}/>
          </li>
        )
      }

      farmGrid.push(
        <ul key={x} className="farm-column" id={"row-" + x}>{row}</ul>
      )
      row = [];
    }

    return farmGrid;
  }


  farmGrid = this.createFarmGrid(this.props.farmColumns, this.props.farmRows);

  render() {
    return (
      <div className="tile-container">
        {this.farmGrid}
      </div>
    )
  }
}

interface TileProps { tileID: string}
class Tile extends React.Component<TileProps, MouseData> {
  constructor(props: any){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
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

  handleMouseDown = ():void => {
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
        />
      </div>
    )
  }
}


interface TileGrowthProps { gpID: string; growthRate: number; }
class TileGrowth extends React.Component<TileGrowthProps, { progress: number }> {
  constructor(props: any){
    super(props)
    this.state = {
      progress: 0,
    }
  }

  ticker: any;
  componentDidMount():void {
    this.ticker = setInterval(() => { this.tick(); }
    , 400)
  }

  componentWillReceiveProps(nextProps: TileGrowthProps) {
    clearInterval(this.ticker)
    this.ticker = setInterval(() =>
      this.tick(), 
      400 / nextProps.growthRate
    )
  }

  tick():void {
    if (this.state.progress >= 100) {
      this.setState({
        progress: 0,
      })
    }

    this.setState(prevState => {
      return { 
        progress: Math.min(Math.max(prevState.progress + 1, 1), 100),
      }
    })
  }

  calculateDimensions = () => {
    let width;
    
    if(this.state.progress >= 100) {
      width = '100%';
    } else {
      width = `${this.state.progress}%`
    }

    return {
      height: '100%',
      width: width 
    } 
  }

  render() {
    return (
      <span id={'gp-' + this.props.gpID} className="tile-growth-progress" style={this.calculateDimensions()}> </span>
    )
  }
}
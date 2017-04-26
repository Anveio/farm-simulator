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

class Game extends React.Component<never, { revenueRate: number }> {
  state = {
    revenueRate: 1
  }

  // handleMouseActions = (mouseData: MouseData):void => {    
  //   const newGrowthRate: number = this.calculateRevenueRate(mouseData)

  //   this.setState(() => {
  //     return { revenueRate: newGrowthRate }
  //   })
  // }

  // calculateRevenueRate(mouseData: MouseData) {
  //   let newGrowthRate: number = 1;

  //   if (!mouseData.hovering){
  //     newGrowthRate = 1;
  //   } else if (mouseData.mouseDown){
  //     newGrowthRate = 4;
  //   } else if (mouseData.hovering) {
  //     newGrowthRate = 2;
  //   }
  //   return newGrowthRate;
  // }

  render() {
    return(
      <div className="game-container">
        <div className="farm">
          <Farm farmRows={5} farmColumns={5}/>
        </div>
        {/*<MoneyCounter revenueRateUpdate={this.state.revenueRate}/>*/}
      </div>
    )
  }
}



interface FarmProps { farmColumns: number; farmRows: number; }
interface FarmState { hovering: boolean; mouseDown: boolean;}
class Farm extends React.Component<FarmProps, FarmState> {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
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
      <EventLayer tileGrid={this.farmGrid}>
      </EventLayer>
    )
  }
}

interface EventLayerProps { tileGrid: JSX.Element[]}
class EventLayer extends React.Component<EventLayerProps, MouseData> {
  constructor(props: any){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
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
    this.setState({
      mouseDown: true
    })
    console.log(e.target)
  }

  handleMouseUp = ():void => {
    this.setState({
      mouseDown: false
    })
  }

  render() {
    return(
      <div 
        className="tile-container" 
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}>
        {this.props.tileGrid}
      </div>
    )
  }
}


interface TileProps { tileID: string}
class Tile extends React.Component<TileProps, never> {

  calculateGrowthRate = (mouseData: MouseData) => {
    let newGrowthRate: number = 1;

    if (!mouseData.hovering){
      newGrowthRate = 1;
    } else if (mouseData.mouseDown){
      newGrowthRate = 4;
    } else if (mouseData.hovering) {
      newGrowthRate = 2;
    }
    return newGrowthRate;
  }

  render() {
    return (
      <div className="tile" id={"tile-" + this.props.tileID}>
        <GrowthProgress gpID={this.props.tileID} />
      </div>
    )
  }
}

class GrowthProgress extends React.Component<any, { progress: number }> {
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
      <span id={'gp-' + this.props.gpID} className="growth-progress" style={this.calculateDimensions()}> </span>
    )
  }
}
import * as React from "react";
import MoneyCounter from "./MoneyCounter";

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

  handleMouseActions = (mouseUpdate: MouseData):void => {    
    const newRevenueRate: number = this.calculateRevenueRate(mouseUpdate)

    this.setState(() => {
      return { revenueRate: newRevenueRate }
    })
  }

  calculateRevenueRate(mouseUpdate: MouseData) {
    let newRevenueRate: number = 1;

    if (!mouseUpdate.hovering){
      newRevenueRate = 1;
    } else if (mouseUpdate.mouseDown){
      newRevenueRate = 4;
    } else if (mouseUpdate.hovering) {
      newRevenueRate = 2;
    }
    return newRevenueRate;
  }

  render() {
    return(
      <div className="game-container">
        <div className="farm">
          <Farm farmRows={5} farmColumns={5} onMouseAction={this.handleMouseActions} growthRate={10}/>
        </div>
        <MoneyCounter revenueRateUpdate={this.state.revenueRate}/>
      </div>
    )
  }
}



interface FarmProps { farmColumns: number; farmRows: number; onMouseAction: any; growthRate: number }
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
          <li key={[x, y].toString()}><Tile growthRate={this.props.growthRate} tileID={[x, y].toString()}/>
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

  sendUpdatedMouseInfo = ():void => {
    const currentMouseStatus = ():MouseData => { 
      return { hovering: this.state.hovering, mouseDown: this.state.mouseDown }
    }

    this.props.onMouseAction(currentMouseStatus());
  }

  handleMouseEnter = ():void => {
    this.setState({
      hovering: true
    })
    
    process.nextTick(this.sendUpdatedMouseInfo);
  }

  handleMouseLeave = ():void => {
    this.setState({
      hovering: false
    })
    
    process.nextTick(this.sendUpdatedMouseInfo);
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>):void => {
    this.setState({
      mouseDown: true
    })
    console.log(e.target)
    process.nextTick(this.sendUpdatedMouseInfo);
  }

  handleMouseUp = ():void => {
    this.setState({
      mouseDown: false
    })

    process.nextTick(this.sendUpdatedMouseInfo);
  }

  farmGrid = this.createFarmGrid(this.props.farmColumns, this.props.farmRows);

  render() {
    return (
      <div 
        className="tile-container" 
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}>
        {this.farmGrid}
      </div>
    )
  }
}


interface TileProps { growthRate: number; tileID: string}
const Tile = (props: TileProps) => {
  return (
    <div className="tile" id={"tile-" + props.tileID}>
      <GrowthProgress gpID={props.tileID} growthRate={props.growthRate} />
    </div>
  )
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
    , 400 / this.props.growthRate)
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
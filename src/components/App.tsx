import * as React from "react";

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
          <Farm farmRows={5} farmColumns={5} onMouseAction={this.handleMouseActions}/>
        </div>
        <MoneyCounter revenueRateUpdate={this.state.revenueRate}/>
      </div>
    )
  }
}

interface MoneyCounterProps { revenueRateUpdate: number }
interface MoneyCounterState { currentMoneyCount: number; }
class MoneyCounter extends React.Component<MoneyCounterProps, MoneyCounterState> {
  constructor(props:MoneyCounterProps){
    super(props)
    this.state = {
      currentMoneyCount: 0,
    };
  }

  ticker: any;

  componentDidMount() {
    this.ticker = setInterval(() => 
      this.tick(), 
      1000
    )
  }

  componentWillReceiveProps(nextProps: MoneyCounterProps) {
    clearInterval(this.ticker)
    this.ticker = setInterval(() =>
      this.tick(), 
      this.calculateRevenueInterval(nextProps.revenueRateUpdate)
    )
  }

  calculateRevenueInterval = (rate: number) => {
    return (1000 * (1/rate));
  }

  tick() {
    this.setState(prevState => {
      return { currentMoneyCount: prevState.currentMoneyCount + 1 }
    })
  }

  render() {
    return(
      <div className="money-display">
        <h3>{this.state.currentMoneyCount}</h3>
      </div>
    )
  }
}

interface FarmProps { farmColumns: number; farmRows: number; onMouseAction: any;}
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
          <li key={[x, y].toString()}><Tile tileID={"tile-" + [x, y].toString()}/>
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


const Tile = (props: { tileID: string }) => {
  return (
    <div className="tile" id={props.tileID}>
      <GrowthProgress />
    </div>
  )
}

class GrowthProgress extends React.Component<any, any> {
  constructor(props: any){
    super(props)
  }

  progressStyle = {
    width: '100%',
    height: '100%',
  }

  render() {
    return (
      <span className="growth-progress" style={this.progressStyle}>
        
      </span>
    )
  }
}
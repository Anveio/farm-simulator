import * as React from "react";

export default class App extends React.Component<any, any> {
  render() {
    return(
      <div>
        <Game />
      </div>
    )  
  }
}

const Game = () => {
  return(
    <div className="game-container">
      <div className="farm">
        <Farm farmRows={5} farmColumns={5} />
      </div>
      <MoneyCounter revenueRate={2}/>
    </div>
  )
}

// interface MoneyCounterProps { updatedMoneyCount: number }
interface MoneyCounterState { currentMoneyCount: number }
class MoneyCounter extends React.Component<any, MoneyCounterState> {
  constructor(props:number){
    super(props)
    this.state = {
      currentMoneyCount: 0
    };
  }

  componentDidMount() {
    setInterval(
      () => this.tick(),
      1000 * (1/this.props.revenueRate) 
    )
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

interface FarmProps { farmColumns: number; farmRows: number; }
interface FarmState { hovering: boolean; mouseDown: boolean; }
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
          <li key={[x, y].toString()}><Tile/>
          </li>
        )
      }

      farmGrid.push(
        <ul key={x} className="farm-column">{row}</ul>
      )

      row = [];
    }

    return farmGrid;
  }

  handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>):void => {
    this.setState({
      hovering: true
    })
    console.log(e.target)
  }

  handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>):void => {
    this.setState({
      hovering: false
    })
    console.log(e.target)
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>):void => {
    this.setState({
      mouseDown: true
    })
    console.log(e.target)
  }

  handleMouseUp = (e: React.MouseEvent<HTMLDivElement>):void => {
    this.setState({
      mouseDown: false
    })
    console.log(e.target)
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

const Tile = () => {
  return (
    <div className="tile"></div>
  )
}
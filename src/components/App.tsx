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
    <div className="container">
      <div className="farm">
        <Farm farmRows={5} farmColumns={5} />
      </div>
      <MoneyCounter />
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

  render() {
    return(
      <div className="money-display">
        <h3>{this.state.currentMoneyCount}</h3>
      </div>
    )
  }
}

interface FarmProps { farmColumns: number; farmRows: number; }
interface FarmState { mouseHover: boolean; mouseDown: boolean; }
class Farm extends React.Component<FarmProps, FarmState> {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      mouseHover: false,
      mouseDown: false
    }

    // this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.handleMouseEnter = this.handleMouseEnter.bind(this);
    // this.handleMouseLeave = this.handleMouseLeave.bind(this);
    // this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  createFarmGrid = (columns: number, rows: number ):JSX.Element[] => {
    let row = [];
    let farmGrid = [];

    for(let x = 0; x < columns; x++) {
      for(let y = 0; y < rows; y++) {
        row.push(
          <li key={[x, y].toString()}><Tile
            onMouseDown={this.handleMouseDown}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseUp={this.handleMouseUp}/>
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

  handleMouseEnter = ():void => {
    this.setState({
      mouseHover: true
    })
  }

  handleMouseLeave = ():void => {
    this.setState({
      mouseHover: false
    })
  }

  handleMouseDown = ():void => {
    this.setState({
      mouseDown: true
    })
    console.log(this.state.mouseDown);
  }

  // e: React.MouseEvent<HTMLDivElement>
  handleMouseUp = ():void => {
    this.setState({
      mouseDown: false
    })
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

const Tile = (props: any) => {
  return (
    <div className="tile"
      onMouseLeave={props.handleMouseLeave}
      onMouseEnter={props.handleMouseEnter} 
      onMouseDown={props.handleMouseDown}
      onMouseUp={props.handleMouseUp}>
    </div>
  )
}
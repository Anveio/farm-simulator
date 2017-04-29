import * as React from "react";

interface FarmGrowthBarProps { 
  gpID: string; 
  growthRate: number;
  growthMultiplier: number;
  onGrowthFinish: any
  onMouseDown: any;
}

export default class FarmGrowthBar extends React.Component<FarmGrowthBarProps, { progress: number }> {
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

  componentWillReceiveProps(nextProps: FarmGrowthBarProps) {
    process.nextTick(() => {
      clearInterval(this.ticker)
      this.ticker = setInterval(() =>
        this.tick(nextProps.growthRate), 
        this.tickRate
      )
    })
  }

  tick(growthMultiplier:number = this.props.growthMultiplier):void {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState({
        progress: 0,
      })
    }

    this.setState(prevState => {
      return { 
        progress: prevState.progress + (1 * growthMultiplier),
      }
    })
  }

  // Clicking on the progress bar doesn't trigger Farm selection without this.
  // Wierd idiosyncracy, maybe can be avoided by structuring the HTMl differently?
  handleMouseDown = ():void => {
    this.props.onMouseDown();
  }

  calculateSizeOfFarmProgressBar = () => {
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
        className="farm-growth-progress" 
        style={this.calculateSizeOfFarmProgressBar()}
        onMouseDown={this.handleMouseDown} > 
      </span>
    )
  }
}
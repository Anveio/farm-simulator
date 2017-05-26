import * as React from "react";

interface Props { 
  gpID: string; 
  growthRate: number;
  efficiency: number;
  onGrowthFinish(): void
  onMouseDown(): void;
}

interface State {
  progress: number;
}

export default class  extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      progress: 0,
    }
  }

  private growthRate = this.props.growthRate;
  
  // Aiming for 60fps.
  readonly tickRate: number = 16.67;
  private ticker: any;

  componentDidMount(): void {
    this.ticker = setInterval(() => { 
      this.tick(); }, 
      this.tickRate)
  }

  componentWillReceiveProps(nextProps: Props) {
    clearInterval(this.ticker)
    this.growthRate = nextProps.growthRate;
    this.ticker = setInterval(() =>
      this.tick(nextProps.efficiency), 
      this.tickRate
    )
  }

  readonly tick = (efficiency:number = this.props.efficiency): void => {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState(prevState => {
        return { 
          progress: prevState.progress - 100 
        }
      })
    }

    this.setState(prevState => {
      return { 
        progress: prevState.progress + (0.1 * efficiency * this.growthRate)
      }
    })
  }

  // Clicking on the progress bar doesn't trigger Farm selection without this.
  // CSS Handles this through `pointer-events: none` but just in case that isn't there
  handleMouseDown = (): void => {
    this.props.onMouseDown();
  }

  calculateWidth = () => {
    const width = this.state.progress >= 100 
      ? '100%'
      : `${this.state.progress}%`
      
    return {
      width: width,
      height: '100%' 
    } 
  }

  render() {
    return (
      <span 
        id={'gp-' + this.props.gpID} 
        className="farm-growth-bar" 
        style={this.calculateWidth()}
        onMouseDown={this.handleMouseDown} > 
      </span>
    )
  }
}
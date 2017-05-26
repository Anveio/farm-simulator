import * as React from "react";
import FarmInfo from "../classes/farmInfo";
import Farm from "./Farm"

interface FarmGridProps { 
  onFarmGrowthFinish(revenue: number): void; 
  onFarmPurchase(farmCost: number): boolean;
  onFarmPurchaseVerification(farmCost: number): void;
  onFarmSelection(farmInfo: FarmInfo): void; 
}

export default class FarmGrid extends React.PureComponent<FarmGridProps, { farms: number } > {
  constructor(props: FarmGridProps) {
    super(props)
    this.state = {
      farms: 9
    }
  }

  handleFarmGrowthBarFinish = (revenue: number): void => {
    this.props.onFarmGrowthFinish(revenue);
  }

  handleFarmSelection = (farmInfo: FarmInfo): void => {
    this.props.onFarmSelection(farmInfo);
  }

  buildFarmGrid = (farmsToCreate: number):JSX.Element[] => {
    let createdFarms: JSX.Element[] = [];

    for(let i = 0; i < farmsToCreate; i++) {
      createdFarms.push(
        <li key={i.toString()} className="farm-li">
          <Farm 
            key={i.toString()}
            farmID={(i + 1).toString()}
            onFarmGrowthBarFinish={this.handleFarmGrowthBarFinish}
            onSelection={this.handleFarmSelection} />
        </li>
      )
    }
    return createdFarms
  }

  calculateFarmCost = (): number => {
    const baseCost: number = 350;
    const coEf: number = 1.65;

    // FORMULA: cost = 350 * (1.65^currentFarmCount)
    return (baseCost * (Math.pow(coEf, this.state.farms)));
  }

  addFarmToFarmGrid = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Maybe not necessary
    const farmCost = this.calculateFarmCost()

    if (this.props.onFarmPurchase(farmCost) === true && this.state.farms < 25) {
      this.props.onFarmPurchaseVerification(farmCost);
      this.setState(prevState => {
        return { farms: prevState.farms += 1 }
      })
    }
  }

  render() {
    const formattedFarmCost = () => {
      const cost = this.calculateFarmCost();
      const formatLargeNum = (cost: number): string => {
        let short = cost.toPrecision(3)
        return parseFloat(short).toExponential();
      }

      const formatSmallNum = (cost: number): string => {
        return parseFloat(cost.toPrecision(3)).toFixed(0);
      }

      return (cost > parseFloat('1e6')) ? formatLargeNum(cost) : formatSmallNum(cost);      
    }

    const farmLimitReached = () => {
      return this.state.farms >= 25
    }

    return (
      <ul className="farm-ul">
        {this.buildFarmGrid(this.state.farms)}
        <li className="farm-li add-farm-li"> 
          <button 
            className="farm add-farm-btn"
            disabled={farmLimitReached()} 
            onClick={this.addFarmToFarmGrid} >
          ${formattedFarmCost()}
          </button> 
        </li>
      </ul>
    )
  }
}
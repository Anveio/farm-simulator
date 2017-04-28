import Farmer from "./farmer";

export default class FarmInfo {
  constructor(readonly farmID: string) {}

  private generateRandomFarmer = () => {
    return new Farmer();
  }

  private generateRandomStatEfficiency = () => {
    return parseFloat((Math.random() + 1).toFixed(2));
  }

  readonly farmer: Farmer = this.generateRandomFarmer();
  readonly efficiency: number = this.generateRandomStatEfficiency();
}
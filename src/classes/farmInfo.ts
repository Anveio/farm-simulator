import Farmer from "./farmer";

export default class FarmInfo {
  constructor(readonly farmID: string) {}

  private generateRandomFarmer = () => {
    return new Farmer();
  }

  readonly farmer: Farmer = this.generateRandomFarmer();
}
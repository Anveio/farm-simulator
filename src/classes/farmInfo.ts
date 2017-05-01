import Farmer from "./farmer";
import NameRepo from "./nameRepo";
import Upgrade from "./upgrade";

const repo = new NameRepo;

export default class FarmInfo {
  constructor(readonly farmID: string) {}

  private generateRandomFarmer = () => {
    return new Farmer();
  }

  private generateRandomFarmName = () => {
    return repo.newFarmName();
  }

  private generateRandomBaseRevenue =() => {
    return parseFloat(( (Math.random() + 1) * 10).toFixed(2));
  }

  readonly farmer: Farmer = this.generateRandomFarmer();
  readonly farmName: string = this.generateRandomFarmName();
  readonly baseRevenue: number = this.generateRandomBaseRevenue();
  readonly upgrades: Upgrade[];
}
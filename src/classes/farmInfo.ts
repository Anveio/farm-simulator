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

  readonly farmer: Farmer = this.generateRandomFarmer();
  readonly farmName: string = this.generateRandomFarmName();
  readonly baseRevenue: number = 1;
  readonly upgrades: Upgrade[];
}
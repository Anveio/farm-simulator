import Farmer from "./farmer";
import NameRepo from "./nameRepo";

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
}
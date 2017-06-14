import NameRepo from './nameRepo';

const repo = new NameRepo;

export interface FarmerInfo { name: string; quote: string; efficiency: number; }
export default class Farmer implements FarmerInfo {
  readonly name: string = repo.newFarmerName();
  readonly quote: string = repo.newFarmQuote();
  readonly efficiency: number = parseFloat((Math.random() + 1).toFixed(2));
}
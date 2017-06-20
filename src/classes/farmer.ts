import repo from './nameRepo';

export default class Farmer {
  readonly name: string = repo.newFarmerName();
  readonly quote: string = repo.newFarmQuote();
  readonly efficiency: number = parseFloat((Math.random() + 1).toFixed(2));
}
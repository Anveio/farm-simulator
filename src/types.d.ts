interface Array<T> {
  sample(): any;
}

declare class Level {
  expReq: number;
  expCurrent: number;
  currentLevel: number;
  constructor(currentLevel: number)
  public addExp: (exp: number) => void;
  private nextExpReq: (currentLevel: number) => number;
  private attemptToLevelUp: () => void;
}

declare class Upgrade {
  constructor(price: number);
}

declare class NameRepo {
  readonly maleFirstNames: string[];
  readonly lastNames: string[];
  readonly farmNamePrefixes: string[];
  readonly farmNameSuffixes: string[];
  readonly farmerQuotes: string[];
  newFarmerName: () => string;
  newFarmQuote: () => string;
  newFarmName: () => string;
}

declare interface FarmInfo {
  readonly farmer: Farmer;
  readonly farmName: string;
  readonly farmLevel: Level;
  readonly baseRevenue: number;
  readonly upgrades: Upgrade[];
}

declare class Farmer {
  readonly name: string;
  readonly quote: string;
  readonly efficiency: number;
}
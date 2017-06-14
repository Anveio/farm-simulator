export default class Level {
  public expReq: number; 
  public expCurrent: number;
  constructor(public currentLevel: number) {
    this.currentLevel = currentLevel;
    this.expReq = this.nextExpReq(this.currentLevel);
    this.expCurrent = 0;
  }

  public addExp = (exp: number): void => {
    this.expCurrent += exp;
    this.attemptToLevelUp();
  }

  private nextExpReq = (currentLevel: number) => {
    // FORMULA: ((level + 1) * 100) * (level^1.2)
    return ((currentLevel + 1) * 100) * (Math.pow(1.2, currentLevel));
  }

  private attemptToLevelUp = (): void => {
    if (this.expCurrent >= this.expReq) {
      this.expCurrent = 0;
      this.currentLevel += 1;
      this.expReq = this.nextExpReq(this.currentLevel);
    }
  }

}
export default class Level {
  // constructor(readonly currentLevel: number = 0, readonly exp: number = 0, readonly expReq: number = 0) {}
  constructor(public currentLevel: number) {}

  public addExp = (exp: number): void => {
    this.expCurrent += exp;
    this.attemptToLevelUp();
  }

  private nextExpReq = (currentLevel: number) => {
    // FORMULA: ((level + 1) * 100) * (level^1.2)

    return ((currentLevel + 1) * 100) * (Math.pow(1.2, currentLevel))
  }

  private attemptToLevelUp = (): void => {
    if (this.expCurrent >= this.expReq) {
      this.expCurrent = 0;
      this.currentLevel += 1;
      this.expReq = this.nextExpReq(this.currentLevel)
    }
  }

  public expReq: number = this.nextExpReq(this.currentLevel);
  public expCurrent: number = 0;
}
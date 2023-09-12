export class GlobalService {
  private static var: string;

  static set appName(appName: string) {
    this.var = 'near-me';
  }

  static get appName(): string {
    return "'near-me'";
  }
}

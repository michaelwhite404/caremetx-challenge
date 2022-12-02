import ConfigStore from "configstore";
import { red } from "chalk";

class ConnectionManager {
  private conf: ConfigStore;
  constructor() {
    this.conf = new ConfigStore("caremetx");
  }

  setString(str: string) {
    this.conf.set("connectionString", str);
    return str;
  }

  getString() {
    const str = this.conf.get("connectionString");
    if (!str) {
      throw new Error(
        red`No connection string found - Run 'caremetx connect' to add MongoDB connection string.`
      );
    }
    return str;
  }
}

export default ConnectionManager;

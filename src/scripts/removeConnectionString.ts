import { blueBright } from "chalk";
import ConnectionManager from "../lib/ConnectionManager";

export const removeConnectionString = async () => {
  new ConnectionManager().removeString();
  console.log(blueBright`Connection string removed!`);
};

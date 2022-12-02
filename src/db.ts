import { connect, disconnect } from "mongoose";
import ConnectionManager from "./lib/ConnectionManager";

export const openDB = async () => {
  const connection = new ConnectionManager();
  try {
    const string = connection.getString();
    return await connect(string);
  } catch (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
};
export const closeDB = async () => await disconnect();

import { connect, connection, disconnect } from "mongoose";
import ConnectionManager from "./lib/ConnectionManager";

export const openDB = async () => {
  const connection = new ConnectionManager();
  const string = connection.getString();
  return await connect(string);
};
export const closeDB = async () => await disconnect();

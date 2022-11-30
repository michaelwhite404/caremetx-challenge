import { connect, connection } from "mongoose";

export const openDB = () => connect("mongodb://localhost:27017/caremetx");
export const closeDB = () => connection.close();

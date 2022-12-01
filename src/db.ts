import { connect, connection, disconnect } from "mongoose";

export const openDB = async () => await connect("mongodb://localhost:27017/caremetx");
export const closeDB = async () => await disconnect();

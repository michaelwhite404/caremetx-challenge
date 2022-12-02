import mongoose from "mongoose";
import inquirer from "inquirer";
import { blueBright, green, red } from "chalk";
import ConnectionManager from "../lib/ConnectionManager";

export const addConnectionString = async () => {
  inquirer
    .prompt({
      type: "input",
      prefix: "",
      name: "connectionString",
      message: green`Enter your connection string:`,
    })
    .then(async ({ connectionString }) => {
      mongoose
        .connect(connectionString)
        .then((m) => {
          new ConnectionManager().setString(connectionString);
          console.log(blueBright`Connection String Set!`);
          m.disconnect();
        })
        .catch((err) => {
          console.log(red`${err.message}`);
          process.exit(1);
        });
    });
  // const mongoose = await connect(connectionString);
  // console.log(mongoose);
  // mongoose.disconnect();
};

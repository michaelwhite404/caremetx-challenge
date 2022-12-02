import mongoose from "mongoose";
import inquirer from "inquirer";
import { blueBright, green, red } from "chalk";
import ora from "ora";
import ConnectionManager from "../lib/ConnectionManager";

export const addConnectionString = async () => {
  inquirer
    .prompt({
      type: "input",
      prefix: "",
      name: "connectionString",
      message: blueBright`Enter your connection string:`,
    })
    .then(async ({ connectionString }) => {
      const spinner = ora({ text: "Connecting..." }).start();
      setTimeout(() => {
        mongoose
          .connect(connectionString)
          .then((m) => {
            new ConnectionManager().setString(connectionString);
            spinner.succeed(green` Connection String Set!`);
            m.disconnect();
          })
          .catch((err) => {
            spinner.fail(red` ${err.message}`);
            process.exit(1);
          });
      }, 500);
    });
};

#!/usr/bin/env node

import inquirer from "inquirer";
import { program } from "commander";
import * as scripts from "./scripts";
import { magenta } from "chalk";
import figlet from "figlet";
import cp from "child_process";
import { closeDB, openDB } from "./db";

type ProgramState = "start" | "reset";

const generateQuestion = (state: ProgramState) => [
  {
    type: "list",
    prefix: "",
    name: "script",
    message: state === "start" ? "What would you like to do?" : "Anything else?",
    choices: [
      { name: "Load Patient Data", type: "choice", value: "load-data" },
      { name: "Schedule Patient Emails", type: "choice", value: "schedule-emails" },
      {
        name: "Find Patients with missing first name",
        type: "choice",
        value: "missing-first-names",
      },
      {
        name: "Find consenting patients without an email",
        type: "choice",
        value: "consent-missing-emails",
      },
      // { name: "Run Tests", type: "choice", value: "test" },
      { type: "separator" },
      { name: "End Program", type: "choice", value: "end" },
    ],
  },
];

const main = async (state: ProgramState) => {
  try {
    const value = await inquirer.prompt(generateQuestion(state));
    switch (value.script) {
      case "load-data":
        scripts.loadData();
        break;
      case "schedule-emails":
        scripts.scheduleEmails();
        break;
      case "missing-first-names":
        scripts.missingFirstNames();
        break;
      case "consent-missing-emails":
        scripts.consentMissingEmails();
        break;
      default:
        console.log(magenta("Have a great day!"));
        return closeDB();
    }
    setTimeout(() => {
      console.log("");
      main("reset");
    }, 1000);
  } catch (err) {
    console.log((err as Error).message);
  }
};

program.name("caremetx").description("CareMetX Challenge");

if (process.argv.length === 2) {
  openDB().catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
  program.action(async () => {
    console.log(await generateAsciiArt());
    setTimeout(() => main("start"), 250);
  });
}

program.command("load-data").description("Load Patient Data").action(scripts.loadData);

program
  .command("schedule-emails")
  .description("Schedule Patient Emails")
  .action(scripts.scheduleEmails);

program
  .command("missing-first-names")
  .description("Find Patients with missing first name")
  .action(scripts.missingFirstNames);

program
  .command("consent-missing-emails")
  .description("Find consenting patients without an email")
  .action(scripts.consentMissingEmails);

program
  .command("test")
  .description("Runs automated tests")
  .action(() => {
    cp.spawn("npm", ["test"], { stdio: "inherit" });
  });

program
  .command("connect")
  .description("Add MongoDB connection string")
  .action(scripts.addConnectionString);

program
  .command("disconnect")
  .description("Remove MongoDB connection string")
  .action(scripts.removeConnectionString);

program.parse();

async function generateAsciiArt() {
  return new Promise((resolve, reject) => {
    figlet.text(
      "CareMetX",
      {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

#!/usr/bin/env node

import inquirer from "inquirer";
import { program } from "commander";
import * as scripts from "./scripts";
import { magenta } from "chalk";
import figlet from "figlet";

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
  if (state === "start") console.log(await generateAsciiArt());
  const value = await inquirer.prompt(generateQuestion(state));
  try {
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
        return console.log(magenta("Have a great day!"));
    }
    setTimeout(() => {
      console.log("");
      main("reset");
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

program
  .name("caremetx")
  .description("CareMetX Challenge")
  .action(() => main("start"));

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

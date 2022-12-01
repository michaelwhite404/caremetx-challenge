#!/usr/bin/env node

import inquirer from "inquirer";
import * as scripts from "./scripts";
import { dim, magenta } from "chalk";

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
      { name: "Run Tests", type: "choice", value: "test" },
      { type: "separator" },
      { name: "End Program", type: "choice", value: "end" },
    ],
  },
];

const main = async (state: ProgramState) => {
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
      case "test":
        console.log(magenta("Will be done soon!"));
        break;
      default:
        return console.log(magenta("Have a great day!"));
    }
    setTimeout(() => {
      console.log(dim("───────────────────────────────────────────────────"));
      main("reset");
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

main("start");

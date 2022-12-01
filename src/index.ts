import inquirer from "inquirer";
import * as scripts from "./scripts";

const main = () => {
  inquirer
    .prompt([
      {
        type: "list",
        prefix: "",
        name: "script",
        message: "What would you like to do?",
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
          { type: "separator" },
          { name: "Run Tests", type: "choice", value: "test" },
        ],
      },
    ])
    .then((value) => {
      try {
        switch (value.script) {
          case "load-data":
            return scripts.loadData();
          case "schedule-emails":
            return scripts.scheduleEmails();
          case "missing-first-names":
            return scripts.missingFirstNames();
          case "consent-missing-emails":
            return scripts.consentMissingEmails();
            return;
          default:
            console.log(value);
        }
      } catch (err) {
        console.log(err);
      }
    });
};

main();

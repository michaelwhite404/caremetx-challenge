import { closeDB, openDB } from "../db";
import { Patient } from "../models";
import { addDays } from "../utils";
import { program } from "commander";
import * as scripts from "../scripts";

program.name("caremetx").description("CareMetX Challenge");

// console.log(process.argv);
// program.action(() => program.error("Nah"));

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

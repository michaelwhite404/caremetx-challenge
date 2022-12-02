# Caremetx Challenge

Challenge for CareMetx

## Installing the script

1. Clone the repository from GitHub

```sh
git clone https://github.com/michaelwhite404/caremetx-challenge.git
cd caremetx-challenge
```

2. Install dependencies

```sh
npm install
```

3. Compile typescript code

```sh
npx tsc
```

4. Link the script

```sh
npm link
```

The command '_**caremetx**_' should now be available

_**Note: Some terminals may not allow linking to the script. If that is the case, you can run 'npm start' as opposed to 'caremetx'**_  
Ex. The command '_**caremetx test**_' can be run as '_**npm start test**_'

## Commands

The first command that should be run is the '_**caremetx connect**_' command. This is where you will add your MongoDB connection string. Then you can run the '_**caremetx**_' command. This will start the CLI to run additional scripts.

| Command                         |                Description                |
| ------------------------------- | :---------------------------------------: |
| caremetx                        |               Runs Main CLI               |
| caremetx connect                |       Add MongoDB connection string       |
| caremetx load-data              |             Load Patient Data             |
| caremetx schedule-emails        |          Schedule Patient Emails          |
| caremetx missing-first-names    |   Find Patients with missing first name   |
| caremetx consent-missing-emails | Find consenting patients without an email |
| caremetx test                   |           Runs automated tests            |
| caremetx disconnect             |     Remove MongoDB connection string      |
| caremetx help                   |         Display help for command          |

## Video

View the development process of this program (https://www.loom.com/share/a2480212e2754753b0ce60552b7c61d0)

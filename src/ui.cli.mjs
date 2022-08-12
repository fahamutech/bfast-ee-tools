// import {program} from "commander";
// import {FunctionsController} from "./controller/functions.controller.mjs";
// import {FunctionsCliController} from "./controller/functions.cli.controller.mjs";
// import {Spinner} from "cli-spinner";
// import {RestController} from "./controller/rest.controller.mjs";

// const spinner = new Spinner('processing.. %s');
// spinner.setSpinnerString('|/-\\');

// const _functionController = new FunctionsController(new RestController());
// const _cliFunctionsController = new FunctionsCliController({
//     functionController: _functionController
// });

// program
//     .command('create <name>')
//     .option('-t, --type <type>', 'project type, only supported angular for now', 'angular')
//     .description('create frontend workspace')
//     .action(async (name, cdm) => {
//         const badIn = name.toString().match(new RegExp('([^A-Za-z])', 'ig'));
//         if (badIn && Array.isArray(badIn) && badIn.length > 0) {
//             console.log('INFO:  project name must be alphabet only, remove numbers and other symbols');
//         } else if (cdm.type && cdm.type === 'angular' && name && name !== '') {
//             try {
//                 name = name.toString().replace(new RegExp('([^A-Za-z])', 'ig'), '').trim();
//                 spinner.start();
//                 const response = await _cliFunctionsController.createFrontedWorkspace(name, cdm.type);
//                 console.log(response);
//                 spinner.stop(true);
//             } catch (e) {
//                 console.log(e && e.message ? e.message : e.toString());
//                 spinner.stop(true);
//             }
//         } else {
//             console.log('INFO: now support angular only for project type');
//         }
//     });

// program
//     .command('serve')
//     .alias('ide')
//     .option('-a, --all', 'start at project choose page', false)
//     .option('-o, --open', 'open ide in browser', false)
//     .description('host web ide for development')
//     .action(async (cmd) => {
//         try {
//             spinner.start();
//             const response = await _cliFunctionsController.openFrontendIDE(process.cwd(), cmd.open, cmd.all);
//             spinner.stop(true);
//             if (response) {
//                 console.log(response);
//             }
//         } catch (e) {
//             spinner.stop(true);
//             console.log(e && e.message ? e.message : e.toString());
//         }
//     });


// program.on('command:*', function () {
//     console.error('Invalid command: %s\n', program.args.join(' ')); // See --help" for a list of available commands.
//     program.help(help => {
//         return help.replace('bfast-ui', 'bfast ui');
//     });
// });

// program.parse(process.argv);

// if (process.argv.length === 2) {
//     program.help(help => {
//         return help.replace('bfast-ui', 'bfast ui');
//     });
// }

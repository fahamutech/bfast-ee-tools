const program = require('commander');
const UserController = require('./controller/UserController');
const DatabaseController = require('./controller/DatabaseController');
const inquirer = require('inquirer');
const Spinner = require('cli-spinner').Spinner;
const spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
const _database = new DatabaseController();
const _userController = new UserController();

program
    .command('login')
    .option('-u, --username <username>',
        'Username you used open bfast cloud account, possible the email you use')
    .option('-p, --password', 'Password for your username')
    .description('login to your remote bfast cloud account')
    .action(async (cdm) => {
        if (cdm.username && cdm.username !== '') {
            try {
                const answer = await inquirer.prompt([
                    {name: "password", type: 'password', message: 'Please enter your password', mask: '*'}
                ]);
                spinner.start();
                await _database.saveUser(await _userController.login(cdm.username, answer.password));
                console.log('\nSuccessful login');
                spinner.stop();
            } catch (e) {
                console.log('\nLogin fails');
                console.log(e);
                spinner.stop();
            }
        } else {
            console.log('Please tell me your username by add -u or --username option, like "bfast user login --username doe@john.com');
        }
    });

program
    .command('logout')
    .description('logout from local device')
    .action(async cmd => {
        try {
            spinner.start();
            const user = await _database.getUser();
            const response = await _userController.logout(user);
            await _database._deleteCurrentUser();
            spinner.stop(true);
            console.log(response.message ? response.message : response);
            console.log('logout successful');
        } catch (e) {
            await _database._deleteCurrentUser();
            spinner.stop(true);
            console.log('logout successful');
        }
    });

program
    .command('login:ci')
    .option('-u, --username <username>',
        'Username you used open bfast cloud account, possible the email you use')
    .option('-p, --password', 'Password for your username')
    .description('get token to be used in your continues integration')
    .action(async (cdm) => {
        if (cdm.username && cdm.username !== '') {
            try {
                const answer = await inquirer.prompt([
                    {name: "password", type: 'password', message: 'Please enter your password', mask: '*'}
                ]);
                spinner.start();
                const user = await _userController.login(cdm.username, answer.password);
                spinner.stop(true);
                console.log('\nNow in your favorite CI environment' +
                    ' run "bfast functions deploy --token ${BFAST_TOKEN}' +
                    ' --projectId ${PROJECT_ID}" to deploy functions, copy token below');
                console.log(`\n\t${user.token}\n`)
            } catch (e) {
                console.log('\nLogin fails');
                console.log(e);
                spinner.stop();
            }
        } else {
            console.log('Please tell me your username by add -u or --username option, like "bfast user login --username doe@john.com');
        }
    });

program.on('command:*', function () {
    console.error('Invalid command: %s\n', program.args.join(' ')); // See --help" for a list of available commands.
    program.help(help => {
        return help.replace('bfast-user', 'bfast user');
    });
});

program.parse(process.argv);

if (process.argv.length === 2) {
    program.help(help => {
        return help.replace('bfast-user', 'bfast user');
    });
}


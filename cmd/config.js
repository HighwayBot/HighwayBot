const fs = require('fs-extra');

module.exports = {
    name: "config",
    description: "Configure the HighwayBot config",
    execute(args) {
        const info = require("../package.json");
        if (info.build === undefined) return console.log('\x1b[31m[X] HighwayBot not installed!\x1b[0m');
        if (!fs.existsSync('./config')) fs.mkdirSync('./config');
        /* if (!fs.existsSync('./config/default.json')) fs.writeFileSync(`./config/default.json`,
            '{\n' +
            '    "username": "player",\n' +
            '    "password": null,\n' +
            '    "ip": "example.com",\n' +
            '    "port": 25565,\n' +
            '    "pin": [0, 0, 0, 0],\n' +
            '    "invport": 8000,\n' +
            '    "prefix": "2w!"\n' +
            '}'
        ); */
        if (!args[1]) {
            return console.log(
                `[Config] Usage: config <config> <key>` +
                `\n\tAvailable key:` +
                `\n\tclone: Clone a config file` +
                `\n\tcreate: Create a config file` +
                `\n\tdelete: Delete a config file` +
                `\n\tedit: Edit a config file with every value` +
                `\n\tlist: List all config files` +
                `\n\tload: Load a config file` +
                `\n\treload: Reload all config file` +
                `\n\trenane: rename a config file` +
                `\n\tshow: Show a config file`
            );
        }
        try {
            if (args[1].toLowerCase() === 'edit') require(`./config/edit`)(args);
            else require(`./config/${args[1]}`)(args[2], args[3]);
        } catch {
            /*
            const file = fs.readdirSync('./cmd/config/')
            if (!file.includes(args[1])) console.log(`\x1b[31m[Config | Error] ${args[1]} is not a available key\x1b[0m`)
            */
            console.log(`\x1b[31m[Config | Error] ${args[1]} is not a available key\x1b[0m`);
        }
    }
};

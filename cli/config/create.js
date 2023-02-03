const fs = require('fs-extra');
const color = require('../util/colorcode');
const string = require('../../language/translate')

module.exports = (args) => {
    let configName;
    if (!args[1] && !fs.existsSync('./config/default.json')) {
        configName = 'default';
    } else {
        if (!args[1] || fs.existsSync('./config/default'))
            return console.log(string('cli._config.create.usage'));
        if (fs.existsSync(`./config/${args[1]}.json`))
            return console.log(string('cli._config.create.already_exist', args[1]));
        configName = args[2];
    }
	
    fs.writeFileSync(`./config/${configName}.json`, JSON.stringify({
        general: {
            ingameprefix: "2w!",
            botusername: "highwaybot",
            owner: "Player",
            version: "1.12.2"
        },
        hostinfo: {
            hostname: "localhost",
            port: 25565,
            inventoryviewerport: 8000,
        },
        module: { 
            highway: {
                mode: "highway",
                direction: "west",
                tunnel: {
                    width: 6,
                    height: 4,
                    highway_style: {
                        corner: true,
                        clear_roof: false
                    }
                },
                dig: {
                    delay: 2,
                    delay_task: 0,
                    algorithm: 3,
                    reach: 4
                },
                place: {
                    delay: 2,
                    delay_task: 0,
                    material: "obsidian",
                    mode: "blatant"
                },
                render: {
                    
                }
            },
            player: {
                combat: {
                    autocrystal: {
                        toggle: false,
                    }
                },
                movenment: {
                    velocity: {
                        toggle: true,

                    }
                },
                utility: {
                    autoeat: {
                        toggle: true,
                    },
                    safety: {
                        toggle: true
                    }
                }
            }
        }
        


    }));
    console.log(string('cli._config.create.done', args[1]))
};

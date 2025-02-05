const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const botname = "GalackGen";
const prefix1 = "+";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');
var app = express();
const chalk = require('chalk');

  bot.on('ready', msg => {
  console.log("");                                   
  console.log((chalk.cyan(`                                            #####                                      #####                `)));
  console.log((chalk.cyan(`                                           #     #   ##   #        ##    ####  #    # #     # ###### #    # `)));
  console.log((chalk.cyan(`                                           #        #  #  #       #  #  #    # #   #  #       #      ##   # `)));
  console.log((chalk.cyan(`                                           #  #### #    # #      #    # #      ####   #  #### #####  # #  # `)));
  console.log((chalk.cyan(`                                           #     # ###### #      ###### #      #  #   #     # #      #  # # `)));
  console.log((chalk.cyan(`                                           #     # #    # #      #    # #    # #   #  #     # #      #   ## `)));
  console.log((chalk.cyan(`                                            #####  #    # ###### #    #  ####  #    #  #####  ###### #    # `)));
  console.log("");                                  
  console.log((chalk.yellow(`                                                               Crée par GalackQSM#7926 !`)));  
  console.log((chalk.yellow(`                                                                © 2020 GalackQSM, Inc.`))); 
  console.log("");                                   
  console.log((chalk.red(`                                                         Discord: https://discord.gg/8DKWMXK`)));   
  console.log((chalk.red(`                                                       Twitter: https://twitter.com/Galack_QSM`)));   
  console.log((chalk.red(`                                                        Github: https://github.com/GalackQSM`)));   
  console.log((chalk.red(`                                                        Youtube: https://youtube.com/GalackQSM`)));   
  console.log("");                                  

  console.log(`Statistiques globales : \n\nLe bot a un total de ${bot.guilds.cache.size} serveurs. \nPour un total de ${bot.users.cache.size} membres.`)
  console.log("Connecté en tant que " + bot.user.id + " | Prefix : " + prefix1 + " | Nombre de Serveurs "+ bot.guilds.cache.size +" | Nombres de salons "+ bot.channels.cache.size +" | Utilisateur totaux "+ bot.users.cache.size +" | Nombre d'emojis totaux "+ bot.emojis.cache.size +'');
  bot.user.setActivity("+help - GalackGen");
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have a 15 minute recovery time! - " +
                    message.author.tag
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please provide a service!");
                var fs = require("fs");
                const filePath = __dirname + "/accounts/" + args[0] + ".txt";

                const embed = {
                    title: "Out of Stock!",
                    description: "The service you requested is currently out of stock!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://i.imgur.com/Bl8zjHy.png",
                        text: "Developed by @Gezzyy"
                    },
                    image: {url:"https://i.imgur.com/XuVrWQh.png"},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/8DKWMXK",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account " + args[0] + " generated!",
                                    description: "The account for your requested service has been sent to your DM!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: "https://i.imgur.com/Bl8zjHy.png",
                                        text: "Developed by @Gezzyy"
                                    },
                                    image: {
                                        url:
                                            "https://i.imgur.com/X1QIYyS.gif"
                                    },
                                    author: {
                                        name: botname + " - Discord Generator",
                                        url: "https://discord.gg/8DKWMXK",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 150000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of Stock");
                        }
                    } else {
                        const embed = {
                            title: "Service not found!",
                            description: "The requested service cannot be found!",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://i.imgur.com/Bl8zjHy.png",
                                text: "Developed by @Gezzyy"
                            },
                            image: {url:"https://i.imgur.com/XuVrWQh.png"},
                            author: {
                                     name: botname + " - account generator",
                                     url: "https://discord.gg/8DKWMXK",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats total" + botname,
                    description: "Total number of users: `" + bot.users.cache.size + " Members`\nTotal in Server: `" + bot.channels.cache.size+ " lounges`\nTotal name d'émoji: `" + bot.emojis.cache.size+ " émojis`\nTotal number of servers: `" + bot.guilds.cache.size+ " servers(s)`",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://i.imgur.com/Bl8zjHy.png",
                        text: "Développé par GalackQSM#7926"
                    },
                    image: {url:"https://i.imgur.com/XuVrWQh.png"},
                    author: {
                         name: botname + " - account generator",
                         url: "https://discord.gg/8DKWM",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: botname + ' - account generator',
                    url: 'https://discord.gg/8DKWMXK',
                    author: {
                        name: 'Order commands',
                        url: 'https://discord.gg/8DKWMXK',
                    },
                    image: {url:"https://i.imgur.com/XuVrWQh.png"},

                    description: '**This is a list of all orders**',
                    fields: [
                        {
                            name: 'Generates accounts',
                            value: "Example: `" + prefix1 +"gen <Service>`",
                        },
                        {
                            name: 'Create a service',
                            value: "Example: `" + prefix1 +"create <Service name>`",
                        },
                        {
                            name: 'Notify account restocks',
                            value: "Example: `" + prefix1 +"restock <Service name> <Service name>`",
                        },
                        {
                            name: 'Add accounts',
                            value: "Exemple: `" + prefix1 +"add <mail:pass> <Service name>`",
                        },
                        {
                            name: 'View bot statistics ' + botname,
                            value: "Exemple: `" + prefix1 +"stats`",
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Developed by @Gezzyy',
                        icon_url: 'https://i.imgur.com/Bl8zjHy.png',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a formatted account string first!")
            if(!service) return message.reply("Provide service first!")
            const filePath = __dirname + "/comptes/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Account successfully added to `" + service + "`!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://i.imgur.com/Bl8zjHy.png",
                        text: "Developed by @Gezzyy"
                    },
                    image: {url:"https://i.imgur.com/XuVrWQh.png"},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/8DKWMXK",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/comptes/" + args[0] + ".txt";
            fs.writeFile(filePath, 'Gezzyy:Gezzyy', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Service created!",
                    description: "Service created successfully `" + args[0] + "`!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://i.imgur.com/Bl8zjHy.png",
                        text: "Developed by @Gezzyy"
                    },
                    image: {url:"https://i.imgur.com/XuVrWQh.png"},
                    author: {
                        name: botname + " - account generator                        ",
                        url: "https://discord.gg/8DKWMXK",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Please put a service!",
                description: "Please provide the name of the replenished service!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://i.imgur.com/Bl8zjHy.png",
                    text: "Develvoped by @Gezzyy"
                },
                 image: {url:"https://i.imgur.com/XuVrWQh.png"},
                author: {
                    name: botname + " account generator ",
                    url: "https://discord.gg/8DKWMXK",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You do not have the permissions to do this!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            if (!args[1])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send("@everyone\n● Restocked: **" + args[0] + "**\n● Restocked: **" + args[1] + " complete(s)**\n● Restock par: " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(config.token);

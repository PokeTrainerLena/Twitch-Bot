import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { bday } from "../messages/Nachrichten.json";


export class HelpCommand extends CommandExecutor {

    private commands:any;

    constructor(commands:Map<string, CommandExecutor>) {
        super("help",
            ['help'],
            "Gib nur !help ein und ich gebe dir alle Befehle. Gibst du !help !befehl ein, dann erkläre ich dir den Befehl :) ", (user) => {
                return true;
            });
            this.commands = commands;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;

            if (args.length == 2) {
                const commandName = args[1].toLowerCase().replace('!', '');
                if (this.commands.has(commandName)) {
                    const command = this.commands.get(commandName);
                    this.sendMessage(chatClient, channel, `Befehl: ${args[1]} - ${command?.description}`,{reply_id: sender.id})
                } else {
                    this.sendMessage(chatClient, channel, `Diesen Befehl kenne ich nicht <3`,{})
                }

            } else {
                let info = new Set();
                for (let command of this.commands.values()) {// this.commands.values() falsch?
                    for (let commandName of command.names) {
                        info.add(`!${commandName}`);
                    }

                }

                this.sendMessage(chatClient, channel, `Befehle: ${Array.from(info).join("\n")}`,{})
            }

            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
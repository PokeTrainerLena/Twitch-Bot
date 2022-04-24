import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";


export class PollCommand extends CommandExecutor {

    constructor() {
        super("poll",
            ['poll', 'umfrage'],
            "Damit gebe ich dir einen social-Link von Leni zurück", (user) => {
                return user.isMod;
            });
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend && args.length > 1) {
            this.canSend = false;
            var choices:string[];
            const array=args.slice(1);
            var titel:string="";
            for (let i = 0; i < array.length; i++) {
                titel = titel+" "+ array[i];
                
            }
            //const titel:string = args.slice(1);
            choices = ["Jepp", "Nepp"];
            /*if (args.length > 6) {
                choices = args.slice(2, 5);
            } else if (args.length < 4) {
                choices = args.slice(2);
            } else {
                choices = ["Jepp", "Nepp"];
            }*/
            this.pollCreate(apiClient,titel,choices);
            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
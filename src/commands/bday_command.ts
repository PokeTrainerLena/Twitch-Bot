import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat/lib";
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { bday } from "../messages/Nachrichten.json";


export class BdayCommand extends CommandExecutor {

    constructor() {
        super("bday",
            ['bday'],
            "Damit gebe ich dir einen social-Link von Leni zurück", (user) => {
                return user.isMod;
            });
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend&&args.length > 1) {
            this.canSend = false;
            
            args[1] = args[1].replace("@", "");
            var replacment: Replacment = { key: "%NAME%", value: this.getName(args[1]) };
            this.sendMessage(chatClient, channel, bday, { replacment: [replacment], reply_id: sender.id })

            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat";
import { CommandExecutor, CommandResult } from "../api/commands/command_executor";
import { funfacts } from "../messages/Nachrichten.json";
import { Replacment } from "../utils/basic_functions";

export class FunfactsCommand extends CommandExecutor {

    constructor() {
        super("funfact",
            ['funfacts', 'funfact', 'fact', 'facts'],
            "Lena ist zu Langweilig und ich muss wieder aushelfen?", (user) => true);
            this.timeout=30;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;
            

            this.sendMessage(chatClient, channel, funfacts, { reply_id: sender.id })

            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
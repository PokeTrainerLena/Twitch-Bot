import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat/lib";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { nuzlocke } from "../messages/Nachrichten.json";


export class NuzlockeCommand extends CommandExecutor {

    constructor() {
        super("nuzlocke",
            ['nuzlocke'],
            "Wenn du findest, dass ich und meine Mod-Kollegen gute arbeit leisten? Dann zeig es uns!", (user) => {
                return true;
            });
            this.timeout=30;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;

            //eigentlicher command beginnt
            this.sendMessage(chatClient, channel, nuzlocke, { reply_id: sender.id })
            //eigentlicher command endet
            
            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
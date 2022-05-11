import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat/lib";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { so } from "../messages/Nachrichten.json";


export class SoCommand extends CommandExecutor {

    constructor() {
        super("so",
            ['so','shoutout'],
            "Wenn du findest, dass ich und meine Mod-Kollegen gute arbeit leisten? Dann zeig es uns!", (user) => {
                return user.isMod;
            });
            this.timeout=10;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend&&args.length > 1) {
            this.canSend = false;
            //eigentlicher command beginnt
            args[1] = args[1].replace("@", "");
            let streamer = args[1]
            var replacment: Replacment = { key: "%NAME%", value: streamer };
            this.sendMessage(chatClient, channel, so, {delay: 500, replacment: [replacment], reply_id: sender.id })
            //eigentlicher command endet
            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
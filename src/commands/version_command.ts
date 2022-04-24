import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { version } from "../messages/Nachrichten.json";


export class VersionCommand extends CommandExecutor {

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

            args[1] = args[1].replace("@", "");
            var replacment1: Replacment = { key: "%NAME%", value: this.getName(sender.userInfo.displayName) };
            var replacment2: Replacment = { key: "%ZAHL%", value: this.getAge().toString() };
            var replacment3: Replacment = { key: "%VERSION%", value: "5.0.0" };
            this.sendMessage(chatClient, channel, version, { replacment: [replacment1,replacment2,replacment3], reply_id: sender.id });

            //eigentlicher command endet
            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
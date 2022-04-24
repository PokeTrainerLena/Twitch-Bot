import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { LurkHandler } from "../handler/lurk_handler";
import { unlurk } from "../messages/lurk.json";

export class UnlurkCommand extends CommandExecutor {

    private handler: LurkHandler;

    constructor(lurkHandler: LurkHandler) {
        super("unlurk",
            ['unlurk', 're'],
            "Damit gebe ich dir einen social-Link von Leni zurück", (u) => true);

        this.handler = lurkHandler;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;

            const username = sender.userInfo.userName;



            var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
            this.sendMessage(chatClient, channel, unlurk, { replacment: [replacment1], reply_id: sender.id });


            if (this.handler.get().find(user => user === username)) {
                this.handler.remove(username);
            }




            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { modloben } from "../messages/Nachrichten.json";


export class ModlobenCommand extends CommandExecutor {

    constructor() {
        super("modloben",
            ['modloben','modsloben'],
            "Wenn du findest, dass ich und meine Mod-Kollegen gute arbeit leisten? Dann zeig es uns!", (user) => {
                return true;
            });
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;
            
        
            this.sendMessage(chatClient, channel, modloben, {  reply_id: sender.id })

            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
/*import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { CommandExecutor, CommandResult } from "../api/commands/command_executor";
import { bday } from "../messages/Nachrichten.json";

export class SocialCommand extends CommandExecutor {

    constructor() {
        super("dc", 
        ['discord', 'dc', 'donate', 'tip', 'doni', 'spende', 'freundescode', 'fc', 'mitspielen', 'instagram', 'ig', 'insta', 'youtube', 'yt'],
         "Damit gebe ich dir einen social-Link von Leni zurück",(u) => true);
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        

        this.sendMessage(chatClient,channel,bday,{reply_id: sender.id})
        //chatClient.say(channel, nachricht[0], { replyTo: sender.id });
        return {status: true};
    }

}*/
import { ChatClient, ChatUser, PrivateMessage } from "twitch-chat-client";
import { ApiClient } from "twitch";
import { CommandExecutor } from "../api/commands/command_executor";

export class SocialCommand extends CommandExecutor{

    constructor() {
        super("dc", ["yt", "dc"]);
    }

    execute(command: string,channel: string,  sender: PrivateMessage,apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean {
            chatClient.say(channel,"Jo fuck you self :D", {replyTo: sender.id});
        return true;
    }

}
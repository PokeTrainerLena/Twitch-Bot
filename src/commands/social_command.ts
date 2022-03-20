import { ChatUser } from "twitch-chat-client";
import { ApiClient } from "twitch";
import { CommandExecutor } from "../api/commands/command_executor";

export class SocialCommand extends CommandExecutor{

    constructor() {
        super("dc", ["yt", "dc"]);
    }

    execute(command: string, sender: ChatUser,apiClient: ApiClient, args: string[]): boolean {
        console.log("test");
        return true;
    }

}
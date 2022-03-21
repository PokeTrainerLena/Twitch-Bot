import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { bday } from "../messages/Nachrichten.json";


export class BdayCommand extends CommandExecutor {

    constructor() {
        super("bday", 
        ['bday'],
         "Damit gebe ich dir einen social-Link von Leni zurück",(user) => {
            return user.isMod;
        });
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        args[0]=args[0].replace("@","");
        var replacment:Replacment={key:"%NAME%",value:args[0]}; 
        this.sendMessage(chatClient,channel,bday,{replacment:[replacment]})
        return {status: true};
    }

}
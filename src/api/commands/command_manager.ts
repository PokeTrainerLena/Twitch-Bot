import { ChatClient, PrivateMessage } from "twitch-chat-client";
import { ApiClient } from "twitch";
import { CommandExecutor } from "./command_executor";


export class CommandManager {
    
    private commands: Map<string, CommandExecutor> = new Map();

    constructor(chatClient: ChatClient, apiClient: ApiClient) {
        chatClient.onMessage((channel,user,message,msg) => this.onCommand(channel,user,message,msg,apiClient, chatClient));
    }

    public add(command: CommandExecutor): void {
        this.commands.set(command.name.toLowerCase(), command);
        command.alias.forEach(alias => {
            this.commands.set(alias.toLowerCase(), command);
        });
    }

    private onCommand(channel: string, user: string, message: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient): void {
        if(message.startsWith("!")) { 
            if (message.includes(" ")) {
                const rawSplitteLine = message.split(" ");
                const rawCommand = rawSplitteLine[0];
                const command = rawCommand.replace('!','').toLowerCase();
                const args = rawSplitteLine.slice(1, rawSplitteLine.length);
                if (this.commands.has(command)) {
                    const result = this.commands.get(command)!.execute(command,channel, msg, apiClient, chatClient, args);
                }
            } else {
                const command = message.replace('!','').toLowerCase();
                const args: string[] = [];
                if (this.commands.has(command)) {
                    const result = this.commands.get(command)!.execute(command,channel, msg, apiClient, chatClient, args);
                }
            }
         }
    }

}
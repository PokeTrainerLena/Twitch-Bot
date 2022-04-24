import { ApiClient } from "@twurple/api";
import { ChatClient, PrivateMessage } from '@twurple/chat';
import { MarkOptions } from "perf_hooks";
import { CommandExecutor } from "./command_executor";


export class CommandManager {

    private commands: Map<string, CommandExecutor> = new Map();

    constructor(chatClient: ChatClient, apiClient: ApiClient) {
        chatClient.onMessage((channel, user, message,msg) => this.onCommand(channel, user, message, msg, apiClient, chatClient));
      
    }

    public add(command: CommandExecutor): void {
        this.commands.set(command.name.toLowerCase(), command);
        command.alias.forEach(alias => {
            this.commands.set(alias.toLowerCase(), command);
        });
    }


public getCommands(){
    return this.commands;
}

    private onCommand(channel: string, user: string, message: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient): void {
        if (message.startsWith("!")) {
            if (message.includes(" ")) {
                const rawSplitteLine = message.split(" ");
                const rawCommand = rawSplitteLine[0];
                const command = rawCommand.replace('!', '').toLowerCase();
                const args = rawSplitteLine.slice(0, rawSplitteLine.length);
                if (this.commands.has(command)) {
                    const commandInstance = this.commands.get(command)!;
                    if (commandInstance.hasPermission(msg.userInfo)) {
                        const result = commandInstance.execute(command, channel, msg, apiClient, chatClient, args);
                        if (!result.status) {
                            throw new Error(result.exception!);
                        }
                    }
                }
            } else {
                const command = message.replace('!', '').toLowerCase();
                const args: string[] = [];
                if (this.commands.has(command)) {
                    const commandInstance = this.commands.get(command)!;
                    if (commandInstance.hasPermission(msg.userInfo)) {
                        const result = commandInstance.execute(command, channel, msg, apiClient, chatClient, args);
                        if (!result.status) {
                            throw new Error(result.exception!);
                        }
                    }
                    
                }
            }
        }
    }

}
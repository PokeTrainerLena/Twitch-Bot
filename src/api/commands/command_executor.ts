import { ChatClient, ChatUser, PrivateMessage } from "twitch-chat-client";
import { ApiClient } from "twitch";


export abstract class CommandExecutor implements Command {
    private _name: string;
    private _alias: string[];

    constructor(name: string, alias: string[]) {
        this._name = name;
        this._alias = alias;
    }
    abstract execute(command: string, channel: string ,msg: PrivateMessage,apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean;


    get name(): string {
        return this._name;
    }

    get alias(): string[] {
        return this._alias;
    }   
}

export interface Command {
    execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean;
}
import { nicknames } from "../../messages/nicknames.json";
import { ApiClient } from "@twurple/api";
import { ChatClient, PrivateMessage } from '@twurple/chat';
import { BIRTH_DAY, Dict, MAX_DELAY, MIN_DELAY, SENSITY_DELAY } from "../../utils/constants";


type messageRply = {delay?: number, reply_id?: string};

export abstract class CommandExecutor implements Command {
    private _name: string;
    private _alias: string[];
    private _description: string;

    constructor(name: string, alias: string[], description: string) {
        this._name = name;
        this._alias = alias;
        this._description = description;
      //  this._nicknames=nicknames
    }
    abstract execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean;


    get name(): string {
        return this._name;
    }

    get alias(): string[] {
        return this._alias;
    }
    get description(): string {
        return this._description;
    }

    sendMessage(chatClient: ChatClient, channel: string, message: string, reply_id?: string) {
        !reply_id ? chatClient.say(channel, message) : chatClient.say(channel, message, { replyTo: reply_id });
    }
    
    sendMessageDelay(chatClient: ChatClient, channel: string, message: string, { delay, reply_id }: messageRply) {
        if (!delay) {
            delay = this.getRandomDelay(message.length);
        }
        var that = this;
        setTimeout(function () {
            that.sendMessage(chatClient, channel, message, reply_id);
        }, delay);
    }

    getRandomDelay(zahl: number): number {
        return Math.round(MAX_DELAY - MAX_DELAY * Math.exp(SENSITY_DELAY * (zahl ^ 2))) + MIN_DELAY;
    }
    getAge() {
        const jetzt = Date.now();
        const diffTime = Math.abs(jetzt.valueOf() - BIRTH_DAY.valueOf());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    getName(username: string): string {
        var nameObject = nicknames as Dict;
        return nameObject[username][this.getRandomInt(nameObject[username].length - 1)] ?? username;
    }


    //end of class CommandExecutor
}

export interface Command {
    execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean;
}
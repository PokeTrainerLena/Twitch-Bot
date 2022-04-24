import { nicknames } from "../../messages/nicknames.json";
import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { BIRTH_DAY, Dict, MAX_DELAY, MIN_DELAY, Nicknames, SENSITY_DELAY } from "../../utils/constants";

export type Replacment = { key: string, value: string };
export type OptionalHeaders = { delay?: number, reply_id?: string, randomDelay?: boolean, replacment?: Replacment[] };
export type CommandResult = { status: boolean, exception?: string };

export abstract class CommandExecutor implements Command {
    private _name: string;
    private _alias: string[];
    private _description: string;
    protected canSend = true;
    protected timeout = 1;//in sek

    private _hasPermission: (user: ChatUser) => boolean;

    constructor(name: string, alias: string[], description: string, hasPermission: (user: ChatUser) => boolean) {
        this._name = name;
        this._alias = alias;
        this._description = description;
        this._hasPermission = hasPermission;
        //  this._nicknames=nicknames
    }
    abstract execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult;


    get name(): string {
        return this._name;
    }

    get alias(): string[] {
        return this._alias;
    }
    get description(): string {
        return this._description;
    }
    get hasPermission(): (user: ChatUser) => boolean {
        return this._hasPermission;
    }

    sendMessage(chatClient: ChatClient, channel: string, message: string | Array<string>, { delay, reply_id, randomDelay = true, replacment }: OptionalHeaders) {

        var exe = () => {
            if (typeof message === "string") {
                !reply_id ? chatClient.say(channel, message) : chatClient.say(channel, message, { replyTo: reply_id });
            } else if (Array.isArray(message)) {
                var finalMessage = message[this.getRandomInt(message.length)] as string;
                if (!(replacment == undefined)) {
                    replacment!.forEach(value => {
                        finalMessage = finalMessage.replaceAll(value.key, value.value);
                    });
                    !reply_id ? chatClient.say(channel, finalMessage) : chatClient.say(channel, finalMessage, { replyTo: reply_id });
                } else {
                    !reply_id ? chatClient.say(channel, finalMessage) : chatClient.say(channel, finalMessage, { replyTo: reply_id });
                }
            }

        };
        if (randomDelay) {

            delay = delay = this.getRandomDelay(message.length);
            console.log(delay);
            setTimeout(exe, delay);
        } else if (!delay) {
            setTimeout(exe, delay);
        } else {
            exe();
        }

    }

    getRandomDelay(chars: number): number {
        return Math.round(MAX_DELAY - (MAX_DELAY- MIN_DELAY) * Math.exp(SENSITY_DELAY * chars)) ;
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

        if (nicknames["user"].find((user) => user === username)) {
            //console.log(nicknames[username][this.getRandomInt(nicknames[username].length)]);
            return nameObject[username][this.getRandomInt(nameObject[username].length - 1)] ?? username;
        } else {
            //console.log("nope");
            //username="@"+username;
            return username;
        }


    }
    //end of class CommandExecutor
}

export interface Command {
    execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult;
}
//import { nicknames } from "../../messages/nicknames.json";
import { ApiClient, HelixCreatePollData } from "@twurple/api";
import { PrivateMessage, ChatUser, ChatClient } from "@twurple/chat";
import { BasicFunctions } from "../../utils/basic_functions";
//import { BIRTH_DAY, Dict, MAX_DELAY, MIN_DELAY, SENSITY_DELAY } from "../../utils/constants";


export type CommandResult = { status: boolean, exception?: string };

export abstract class CommandExecutor extends BasicFunctions implements Command {
    private _name: string;
    private _alias: string[];
    private _description: string;
    protected canSend = true;
    protected timeout = 1;//in sek

    private _hasPermission: (user: ChatUser) => boolean;

    constructor(name: string, alias: string[], description: string, hasPermission: (user: ChatUser) => boolean) {
        super();
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

    /*sendMessage(chatClient: ChatClient, channel: string, message: string | Array<string>, { delay, reply_id, randomDelay = true, replacment }: OptionalHeaders) {

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
        return Math.round(MAX_DELAY - (MAX_DELAY - MIN_DELAY) * Math.exp(SENSITY_DELAY * chars));
    }
    
    getAge() {
        const birthdate = new Date("2022,2,2");
        const jetzt = Date.now();
        const difference = Math.abs(jetzt - birthdate.getMilliseconds());
        var date = new Date(0);
        date.setSeconds(Math.ceil(difference / 1000));
        var timeFormatted = ``;
        var days = date.getDate();
        var months = date.getMonth();
        var year = date.getFullYear() -1970;
    
        if (year > 1) {
          timeFormatted = timeFormatted + `${year.toString()} Jahre `;
        }
        else if (year == 1) {
          timeFormatted = timeFormatted + `ein Jahr `;
        }
    
        if (months > 1) {
          if ((!(timeFormatted == ``))&&days<=0) {
            timeFormatted = timeFormatted + ` und `;
          }
          timeFormatted = timeFormatted + `${months.toString()} Monate `;
        }
        else if (months == 1) {
          timeFormatted = timeFormatted + `ein Monat `;
        }
    
        if (days > 1) {
          if (!(timeFormatted == ``)) {
            timeFormatted = timeFormatted + ` und `;
          }
          timeFormatted = timeFormatted + ` ${days.toString()} Tage `;
        }
        else if (days == 1) {
          timeFormatted = timeFormatted + `einen Tag `;
        }
    
        return timeFormatted;
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


    }*/
    async pollCreate(apiClient: ApiClient, titel: string, choices: string[]) {
        var data: HelixCreatePollData = {
            bitsPerVote: 10,
            channelPointsPerVote: 100,
            title: titel,
            choices: choices,
            duration: 300
        };
        apiClient.polls.createPoll(await apiClient.users.getMe(), data).catch(reason => {
            console.log(reason);
        });
    }
    //end of class CommandExecutor
}

export interface Command {
    execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult;
}
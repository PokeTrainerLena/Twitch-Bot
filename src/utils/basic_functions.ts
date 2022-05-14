import { ChatClient } from "@twurple/chat";
//import { OptionalHeaders } from "../api/listener/listener_manager";
import { Dict, MAX_DELAY, MIN_DELAY, SENSITY_DELAY } from "./constants";
import { nicknames } from "../messages/nicknames.json";

export type Replacment = { key: string, value: string };
export type OptionalHeaders = { delay?: number, reply_id?: string, randomDelay?: boolean, replacment?: Replacment[] };

export class BasicFunctions {


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
}
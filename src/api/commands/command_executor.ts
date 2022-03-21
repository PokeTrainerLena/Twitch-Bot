
import { ApiClient } from "@twurple/api";
import { ChatClient, PrivateMessage } from '@twurple/chat';
export abstract class CommandExecutor implements Command {
    private _name: string;
    private _alias: string[];
    private _description: string;

    constructor(name: string, alias: string[],description: string) {
        this._name = name;
        this._alias = alias;
        this._description = description;
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
        if (!reply_id) {//!reply_id   typeof reply_id =='undefined'
            chatClient.say(channel, message);
        } else {
            chatClient.say(channel, message,{ replyTo: reply_id });
        }
        
      }
      
      sendMessageDelay(chatClient: ChatClient, channel: string, message: string,  delay?: number,reply_id?: string) {
          if (typeof delay =='undefined'||delay==0) {
            this.getRandomDelay(message.length)
          }
        var that = this;
        setTimeout(function () {
          that.sendMessage(chatClient,channel,message,reply_id)
        }, delay);
      }

      getRandomDelay(zahl: number) {
        const max = 13000; //in millisekunden
        const empf = -0.01;
        const val = Math.round(max - max * Math.exp(empf * (zahl ^ 2))) + 2000;
        console.log(val);
        return val;
      }
    //end of class CommandExecutor
}

export interface Command {
    execute(command: string, channel: string, msg: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean;
}
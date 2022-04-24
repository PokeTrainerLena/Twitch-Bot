import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { pause, stop } from "../messages/Nachrichten.json";
import { PAUSE, startPipiPause, stopPipiPause } from "../utils/state";
import { LurkHandler } from "../handler/lurk_handler";

export class PauseCommand extends CommandExecutor {

    private soHandler:LurkHandler

    constructor(soHandler:LurkHandler) {
        super("pause",
            ['pause'],
            "Wenn du findest, dass ich und meine Mod-Kollegen gute arbeit leisten? Dann zeig es uns!", (user) => {
                return user.isMod;
            });
        this.timeout = 30;
        this.soHandler = soHandler;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend&&PAUSE == false) {
            this.canSend = false;
            //eigentlicher command beginnt

            var nachricht = pause;
                startPipiPause();
                var that = this;
                setTimeout(function () {
                    if (PAUSE)
                        that.sendMessage(chatClient, channel,nachricht["eins"],{reply_id: sender.id});
                }, 1500);
                setTimeout(function () {
                    if (PAUSE)
                    that.sendMessage(chatClient, channel,nachricht["zwei"],{reply_id: sender.id});
                }, 20500);
                this.messageInterval(chatClient, channel);
            
            
            //eigentlicher command endet
            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }
    messageInterval(client: ChatClient, channel:string) {
        var that = this;
        setTimeout(function () {
          if (PAUSE)
            that.sendMessage(client,channel,`!so @${that.soHandler.getRandom()}`, {}
            );
        }, 3800);
        const myInterval = setInterval(() => {
          if (PAUSE) {
            this.sendMessage(client,channel,`!so @${this.soHandler.getRandom()}`,{delay:3800});
          } else {
            clearInterval(myInterval);
            return;
          }
        }, 30500);
      }

}

export class StopCommand extends CommandExecutor {

    constructor(){
        super("stop",['stop', 'stopp','ende','wiederda'],"Der ist für die Mods, um die Pipipause zu stoppen <3 ",(user) => {
            return user.isMod;
        });
    }
    execute (command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if(PAUSE){
            var nachricht = stop;
            stopPipiPause();
            this.sendMessage(chatClient, channel,nachricht,{});
            
        }
        return { status: true };
    }


}
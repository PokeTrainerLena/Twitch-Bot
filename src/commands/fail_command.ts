import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { fail } from "../messages/Nachrichten.json";


export class FailCommand extends CommandExecutor {

    private fail=0;
    private day = new Date().getDate();
    private today = new Date();

    constructor() {
        super("fail", 
        ['fail'],
         "Zähle mit wie oft Lena failt",(user) => {
            return user.isMod;
        });

    this.timeout=10;
    setInterval(() => {
      this.today = new Date();
      if (this.day != this.today.getDate() && this.today.getHours() >= 6) {
        this.fail = 0;
        console.log("fail reset");
        this.day = this.today.getDate();
      }
    }, 60000);
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            var nachricht = fail;
            this.canSend = false;
            this.fail++;
            let ausgabe = "";

            switch (true) {
              case this.fail == 1:
                ausgabe = nachricht["eins"][
                  this.getRandomInt(nachricht["eins"].length)
                ].replace("%ZAHL%", this.fail.toString());
                break;
              case this.fail < 4:
                ausgabe = nachricht["zwei"][
                  this.getRandomInt(nachricht["zwei"].length)
                ].replace("%ZAHL%", this.fail.toString());
                break;
              case this.fail < 6:
                ausgabe = nachricht["drei"][
                  this.getRandomInt(nachricht["drei"].length)
                ].replace("%ZAHL%", this.fail.toString());
                break;
              case this.fail < 8:
                ausgabe = nachricht["vier"][
                  this.getRandomInt(nachricht["vier"].length)
                ].replace("%ZAHL%", this.fail.toString());
                break;
              case this.fail > 7:
                ausgabe = nachricht["fünf"][
                  this.getRandomInt(nachricht["fünf"].length)
                ].replace("%ZAHL%", this.fail.toString());
                break;
            }
            this.sendMessage(chatClient, channel,ausgabe,{reply_id: sender.id});
            var that = this;
            setTimeout(function () {
              that.canSend = true;
            }, this.timeout*1000);
          }
          return {status: true};
    }

}
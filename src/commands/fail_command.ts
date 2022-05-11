import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat/lib";
import { userInfo } from "os";
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { fail } from "../messages/Nachrichten.json";


export class FailCommand extends CommandExecutor {

  private fail = 0;
  private day = new Date().getDate();
  private today = new Date();

  constructor() {
    super("fail",
      ['fail'],
      "Zähle mit wie oft Lena failt", (u) => true);

    this.timeout = 10;
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
    var replacment: Replacment = { key: "%ZAHL%", value: (this.fail+1).toString() };
    if (this.canSend) {
      this.canSend = false;
      var nachricht = fail;
      this.fail++;
      let ausgabe = [""];

      switch (true) {
        case this.fail == 1:
          ausgabe = nachricht["eins"]//[this.getRandomInt(nachricht["eins"].length)];
          break;
        case this.fail < 4:
          ausgabe = nachricht["zwei"]//[this.getRandomInt(nachricht["zwei"].length)];
          break;
        case this.fail < 6:
          ausgabe = nachricht["drei"]//[this.getRandomInt(nachricht["drei"].length)];
          break;
        case this.fail < 8:
          ausgabe = nachricht["vier"]//[this.getRandomInt(nachricht["vier"].length)];
          break;
        case this.fail > 7:
          ausgabe = nachricht["fünf"]//[this.getRandomInt(nachricht["fünf"].length)];
          break;
      }
      this.sendMessage(chatClient, channel, ausgabe, { reply_id: sender.id, replacment: [replacment] });
      var that = this;
      setTimeout(function () {
        that.canSend = true;
      }, this.timeout * 1000);
    }
    return { status: true };
  }

}
import { ApiClient } from "@twurple/api";
import { ChatClient, PrivateMessage } from '@twurple/chat';
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { ChatInteraction } from "../messages/ChatInteraction.json";

import { ME } from "../messages/regex.json"

//funktioniert nicht

export class ChatInteractionCommand extends CommandExecutor {

  

  constructor() {
    super("explode",
      ["explode", "pat", "hug", "knuddel", "knuddeln", "umarmen", "umarmung", "liebe", "love", "kiss", "kuss", "schmatzer", "bussi", "loben", "lob", "flirt"],
      "Bringe deine nächsten zum explodieren mit !explode @someone", (u) => true);
      this
  }

  execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
    if (this.canSend) {
      this.canSend = false;
      var replacment2: Replacment;
      !args[1] ? 0: replacment2 = { key: "%NAME2%", value: this.getName(args[1]) };
      
      const username = sender.userInfo.userName;
      
      var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
      
      switch (command) {
        case "explode":
          var nachricht = this.Message(ChatInteraction.explode, channel, sender, args);
          break;
        case "pat":
        case "hug":
        case "knuddel":
        case "knuddeln":
        case "umarmen":
        case "umarmung":
        case "love":
        case "liebe":
          var nachricht = this.Message(ChatInteraction.hug, channel, sender, args);
          break;
        case "kiss":
        case "kuss":
        case "schmatzer":
        case "bussi":
          var nachricht = this.Message(ChatInteraction.kiss, channel, sender, args);
          break;
        case "loben":
        case "lob":
          var nachricht = this.Message(ChatInteraction.loben, channel, sender, args);
          break;
        case "flirt":
          var nachricht = this.Message(ChatInteraction.flirt, channel, sender, args);
          break;
        default:
          var nachricht = this.Message(ChatInteraction, channel, sender, args);
          break;
      }
      !args[1] ? this.sendMessage(chatClient, channel, nachricht, { replacment: [replacment1], reply_id: sender.id }): this.sendMessage(chatClient, channel, nachricht, { replacment: [replacment1, replacment2!], reply_id: sender.id });
      /*if (args.length>1) {
        var replacment2: Replacment = { key: "%NAME2%", value: this.getName(args[1]) };
        this.sendMessage(chatClient, channel, nachricht, { replacment: [replacment1, replacment2], reply_id: sender.id });
      } else {
        this.sendMessage(chatClient, channel, nachricht, { replacment: [replacment1], reply_id: sender.id });
      }*/
      


      var that = this;
      setTimeout(function () {
        that.canSend = true;
      }, this.timeout * 1000);

    }
    return { status: true };
  }

  Message(nachricht: any, channel: string, sender: PrivateMessage, args: string[]) {
    const meRegex = ME.standard.map(
      (e) => new RegExp(e.replace("@", ""), "gim")
    );
    const username = sender.userInfo.userName;
    var ausgabe;

    if (args.length <= 1) {
      ausgabe = this.withoutReciever(args, username, nachricht);
    } else {
      args[1] = args[1].replace("@", "");
      if (meRegex.some((regex) => args[1].match(regex))) {
        ausgabe = this.botReciever(args, username, nachricht);//bot ist adrresiert

      } else if (args[1].includes(username)) {

        ausgabe = nachricht["standard"]["self"];//selfdestruct

      } else if (
        nachricht["TargetIndividuell"]["namen"].find(//gibt es ein besonderes Ziel
          (user: string) => user === args[1]
        )
      ) {
        this.individReciever(args, username, nachricht);
      } else {
        if (
          nachricht["SenderIndividuell"]["namen"].find(
            (user: string) => user === username
          )
        ) {
          //gibt es eine individ Nachricht für den Sender?

          ausgabe = nachricht["SenderIndividuell"][username]["Target"];

        } else {
          //kein individ Adress oder Sender

          ausgabe = nachricht["standard"]["Target"];

        }
      }
    }

    return ausgabe;
  }

  individReciever(args: string[], username: string, nachricht: any) {
    // nachricht
    //individ Adress?
    if (
      nachricht["TargetIndividuell"][args[1]]["namen"].find(
        (user: string) => user === username
      )
    ) {
      //individ Sender?
      return nachricht["TargetIndividuell"][args[1]][username];

    } else {
      //individ Adress aber kein individ Sender
      return nachricht["TargetIndividuell"][args[1]]["standard"];

    }

  }
  botReciever(args: string[], username: string, nachricht: any) {
    if (
      nachricht["TargetIndividuell"]["bot"]["namen"].find(
        (user: string) => user === username
      )
    ) {
      //gibt es eine individ Nachricht für den Sender?
      return nachricht["TargetIndividuell"]["bot"][username];

    } else {
      //bot Adress aber kein individ Sender
      return nachricht["TargetIndividuell"]["bot"]["standard"];

    }
  }

  withoutReciever(args: string[], username: string, nachricht: any) {
    if (
      nachricht["SenderIndividuell"]["namen"].find(
        (user: string) => user === username
      )
    ) {
      //gibt es eine individ Nachricht für den Sender?
      return nachricht["SenderIndividuell"][username]["noTarget"];

    } else {
      //kein individ Adress oder Sender
      return nachricht["standard"]["noTarget"];
    }
  }








}
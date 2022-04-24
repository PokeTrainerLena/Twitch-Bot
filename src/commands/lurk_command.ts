import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { CommandExecutor, CommandResult, Replacment } from "../api/commands/command_executor";
import { LurkHandler } from "../handler/lurk_handler";
import { lurk, unlurk } from "../messages/lurk.json";

export class LurkCommand extends CommandExecutor {

    private lurkHandler: LurkHandler;

    constructor(lurkHandler: LurkHandler) {
        super("lurk",
            ['lurk', 'afk', 'klo', 'duschlurk', 'badlurk', "schlaflurk", "gaminglurk", "zockerlurk", "spielelurk", "kochlurk", "esslurk"],
            "Du willst Lena signalisieren, dass du jetzt im Lurk bist? Dann nutze !lurk", (u) => true);

        this.lurkHandler = lurkHandler;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;

            const username = sender.userInfo.userName;
            this.lurkHandler.add(username);

            switch (command) {
                case "lurk":
                case "afk":
                case "klo":
                    var nachricht = lurk["lurk"];
                    break;
                case "duschlurk":
                case "badlurk":
                    var nachricht = lurk["duschlurk"];
                    break;
                case "gaminglurk":
                case "zockerlurk":
                case "spielelurk":
                    var nachricht = lurk["gaminglurk"];
                    break;
                case "kochlurk":
                    var nachricht = lurk["kochlurk"];
                    break;
                case "schlaflurk":
                    var nachricht = lurk["schlaflurk"];
                    break;
                case "esslurk":
                    var nachricht = lurk["esslurk"];
                    break;
                default:
                    var nachricht = lurk["lurk"];
                    break;
            }
            
            var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
            var replacment2: Replacment = { key: "%ZAHL%", value: this.lurkHandler.getLength().toString() };
            if (this.lurkHandler.getLength() === 1) {
                this.sendMessage(chatClient, channel, nachricht["ersterLurker"], { replacment: [replacment1, replacment2],reply_id: sender.id });
          
              } else {
                this.sendMessage(chatClient, channel, nachricht["mehrereLurker"], { replacment: [replacment1, replacment2],reply_id: sender.id });
          
              }

            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}

export class UnlurkCommand extends CommandExecutor {

    private handler: LurkHandler;

    constructor(lurkHandler: LurkHandler) {
        super("unlurk",
            ['unlurk', 're'],
            "Damit gebe ich dir einen social-Link von Leni zurück", (u) => true);

        this.handler = lurkHandler;
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
        if (this.canSend) {
            this.canSend = false;

            const username = sender.userInfo.userName;



            var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
            this.sendMessage(chatClient, channel, unlurk, { replacment: [replacment1], reply_id: sender.id });


            if (this.handler.get().find(user => user === username)) {
                this.handler.remove(username);
            }




            var that = this;
            setTimeout(function () {
                that.canSend = true;
            }, this.timeout * 1000);

        }
        return { status: true };
    }

}
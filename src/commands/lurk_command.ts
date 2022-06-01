import { ApiClient } from "@twurple/api";
import { PrivateMessage, ChatClient } from "@twurple/chat";
import { CommandExecutor, CommandResult } from "../api/commands/command_executor";
import { LurkHandler } from "../handler/lurk_handler";
import { lurk, unlurk } from "../messages/lurk.json";
import { Replacment } from "../utils/basic_functions";

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

            var lurkType = "lurk";

            switch (command) {
                case "duschlurk":
                case "badlurk":
                    lurkType = "duschlurk";
                    break;
                case "gaminglurk":
                case "zockerlurk":
                case "spielelurk":
                    lurkType = "gaminglurk";
                    break;
                case "kochlurk":
                    lurkType = "kochlurk";
                    break;
                case "schlaflurk":
                    lurkType = "schlaflurk";
                    break;
                case "esslurk":
                    lurkType = "esslurk";
                    break;
                default:
                    lurkType = "lurk";
                    break;
            }
            var nachricht = lurk["lurk"];
            for (const [key, value] of Object.entries(lurk)) {
                if (key == lurkType) {
                    nachricht = value;
                }
            }

            this.lurkHandler.add(username, lurkType);

            var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
            var replacment2: Replacment = { key: "%ZAHL%", value: this.lurkHandler.getLength().toString() };
            if (this.lurkHandler.getLength() === 1) {
                this.sendMessage(chatClient, channel, nachricht["ersterLurker"], { replacment: [replacment1, replacment2], reply_id: sender.id });

            } else {
                this.sendMessage(chatClient, channel, nachricht["mehrereLurker"], { replacment: [replacment1, replacment2], reply_id: sender.id });

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

            var lurkType = this.handler.getLurkType(username);
            var nachricht = unlurk["lurk"];
            for (const [key, value] of Object.entries(unlurk)) {
                if (key == lurkType) {
                    nachricht = value;
                }
            }
            var replacment1: Replacment = { key: "%NAME%", value: this.getName(username) };
            this.sendMessage(chatClient, channel, nachricht, { replacment: [replacment1], reply_id: sender.id });


            if (this.handler.findUser(username)) {
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
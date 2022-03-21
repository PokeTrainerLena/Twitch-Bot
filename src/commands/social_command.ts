import { ApiClient } from "@twurple/api";
import { ChatClient, PrivateMessage } from '@twurple/chat';
import { CommandExecutor } from "../api/commands/command_executor";
import { socials } from "../messages/socials.json";

export class SocialCommand extends CommandExecutor {

    constructor() {
        super("dc", ['discord', 'dc', 'donate', 'tip', 'doni', 'spende', 'freundescode', 'fc', 'mitspielen', 'instagram', 'ig', 'insta', 'youtube', 'yt'], "Damit gebe ich dir einen social-Link von Leni zurück");
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): boolean {
        switch (command) {
            case "discord":
            case "dc":
                var nachricht = socials["discord"];
                break;
            case "donate":
            case "tip":
            case "doni":
            case "spende":
                var nachricht = socials["donate"];
                break;
            case "freundescode":
            case "fc":
            case "mitspielen":
                var nachricht = socials["freundescode"];
                break;
            case "instagram":
            case "ig":
            case "insta":
                var nachricht = socials["instagram"];
                break;
            case "youtube":
            case "yt":
                var nachricht = socials["youtube"];
                break;
            default:
                var nachricht=[""];
                break;
        }

        this.sendMessage(chatClient,channel,nachricht[0],sender.id)
        //chatClient.say(channel, nachricht[0], { replyTo: sender.id });
        return true;
    }

}
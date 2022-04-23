import { ApiClient } from "@twurple/api";
import { ChatClient, ChatUser, PrivateMessage } from '@twurple/chat';
import { CommandExecutor, CommandResult } from "../api/commands/command_executor";
import { ChatInteraction } from "../messages/ChatInteraction.json";






export class ChatInteractionCommand extends CommandExecutor {

    constructor() {
        super("explode",
            ["explode", "pat", "hug", "knuddel", "knuddeln", "umarmen", "umarmung", "liebe", "love", "kiss", "kuss", "schmatzer", "bussi", "loben", "lob", "flirt"],
            "Bringe deine nächsten zum explodieren mit !explode @someone", (u) => true);
    }

    execute(command: string, channel: string, sender: PrivateMessage, apiClient: ApiClient, chatClient: ChatClient, args: string[]): CommandResult {
      /*  switch (command) {
            case "explode":
                var nachricht = ChatInteraction.explode;
                break;
            case "pat":
            case "hug":
            case "knuddel":
            case "knuddeln":
            case "umarmen":
            case "umarmung":
            case "love":
            case "liebe":
                var nachricht = ChatInteraction.hug;
                break;
            case "kiss":
            case "kuss":
            case "schmatzer":
            case "bussi":
                var nachricht = ChatInteraction.kiss;
                break;
            case "loben":
            case "lob":
                var nachricht = ChatInteraction.loben;
                break;
            case "flirt":
                var nachricht = ChatInteraction.flirt;
                break;
            default:
                var nachricht;
                break;
        }
        //this.sendMessage(chatClient, channel, nachricht, { reply_id: sender.id })
        return { status: true };
    }


    individReciever(chatClient: ChatClient, channel: string, args: string[], username: string, nachricht: Object, key: string) {
        nachricht
        //individ Adress?
        if (
            nachricht[key]["TargetIndividuell"][args[1]]["namen"].find(
                (user) => user === username
            )
        ) {
            //individ Sender?
            const replacement = { "%NAME%": this.getName(username), "%NAME2%": this.getName(args[1]) };
            this.sendMessage(chatClient, channel, nachricht["TargetIndividuell"][args[1]][username], replacement);

        } else {
            //individ Adress aber kein individ Sender
            const replacement = { "%NAME%": this.getName(username), "%NAME2%": this.getName(args[1]) };
            this.sendMessage(chatClient, channel, nachricht["TargetIndividuell"][args[1]]["standard"], replacement);

        }*/
        return { status: true };
    }









}
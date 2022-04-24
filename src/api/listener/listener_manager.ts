
import { ApiClient, HelixUser } from "@twurple/api";
import { EventSubChannelCheerEvent, EventSubChannelFollowEvent, EventSubListener } from "@twurple/eventsub";
import { ChatClient } from '@twurple/chat';
import { MAX_DELAY, MIN_DELAY, SENSITY_DELAY } from "../../utils/constants";

export type Replacment = { key: string, value: string };
export type OptionalHeaders = { delay?: number, reply_id?: string, randomDelay?: boolean, replacment?: Replacment[] };

export class EventManager {
    private events: Map<string, Array<Listener<any>>> = new Map();

    public register(listener: Listener<any>): void {
        if (this.events.has(listener.type())) {
            this.events.get(listener.type())?.push(listener);
        } else {
            this.events.set(listener.type(), []);
            this.events.get(listener.type())?.push(listener);
        }
    }
    public async start(listener: EventSubListener, user: HelixUser, apiClient: ApiClient, chatClient: ChatClient) {
        await listener.subscribeToChannelFollowEvents(user.id!, (e) => { // subscribeToChannelFollowEvents anpassen!!!
            this.events.get(EventSubChannelFollowEvent.name)?.forEach(ev => { // EventSubChannelFollowEvent anpassen!!!!
                ev.on(e, apiClient, chatClient);
            });
        });
        await listener.subscribeToChannelCheerEvents(await apiClient.users.getMe(), (e) => { // subscribeToChannelFollowEvents anpassen!!!
            this.events.get(EventSubChannelCheerEvent.name)?.forEach(ev => { // EventSubChannelFollowEvent anpassen!!!!
                ev.on(e, apiClient, chatClient);
            });
        });
        // Die Logik bleibt gleich
    }

}

export class Listener<T> {
    on(event: T, apiClient: ApiClient, chatClient: ChatClient): void{}
    type(): string{return "";}
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

    
}
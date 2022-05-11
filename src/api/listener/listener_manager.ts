import { ApiClient, HelixUser } from "@twurple/api";
import { ChatClient } from "@twurple/chat";
import { EventSubChannelCheerEvent, EventSubChannelFollowEvent, EventSubListener } from "@twurple/eventsub";

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
        await listener.subscribeToChannelCheerEvents( user.id!, (e) => { // subscribeToChannelFollowEvents anpassen!!!
            this.events.get(EventSubChannelCheerEvent.name)?.forEach(ev => { // EventSubChannelFollowEvent anpassen!!!!
                ev.on(e, apiClient, chatClient);
            });
        });
        // Die Logik bleibt gleich
    }

}

export interface Listener<T> {
    on(event: T, apiClient: ApiClient, chatClient: ChatClient): void;
    type(): string;
     
}
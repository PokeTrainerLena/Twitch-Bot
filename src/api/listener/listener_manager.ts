import { ChatClient } from "twitch-chat-client";
import { EventSubListener } from "twitch-eventsub";
import { EventSubChannelFollowEvent } from "twitch-eventsub/lib/Events/EventSubChannelFollowEvent";
import { ApiClient, HelixUser } from "twitch";


export class EventManager {
    private events: Map<string,Array<Listener<any>>> = new Map();

    public register(listener: Listener<any>): void {
        if (this.events.has(listener.type())) {
            this.events.get(listener.type())?.push(listener);
        } else {
            this.events.set(listener.type(), []);
            this.events.get(listener.type())?.push(listener);
        }
    }
    public start(listener: EventSubListener,user: HelixUser, apiClient: ApiClient, chatClient: ChatClient): void {
        listener.subscribeToChannelFollowEvents(user.id!, (e) => { // subscribeToChannelFollowEvents anpassen!!!
            this.events.get(EventSubChannelFollowEvent.name)?.forEach(ev => { // EventSubChannelFollowEvent anpassen!!!!
                ev.on(e,apiClient,chatClient);
            });
        });
        // Die Logik bleibt gleich
    }

}

export interface Listener<T> {
    on(event:T, apiClient: ApiClient, chatClient: ChatClient): void;
    type(): string;
}
import { ChatClient } from "twitch-chat-client";
import { EventSubChannelFollowEvent } from "twitch-eventsub/lib/Events/EventSubChannelFollowEvent";
import { ApiClient } from "twitch";
import { Listener } from "../../api/listener/listener_manager";


export class FollowListener implements Listener<EventSubChannelFollowEvent> {

    type(): string {
        return EventSubChannelFollowEvent.name;
    };
    
    async on(event: EventSubChannelFollowEvent, apiClient: ApiClient, chatClient: ChatClient) {
        const r = await event.getBroadcaster();
        await chatClient.say(r.name,"Danke für dein follow @"+event.userDisplayName);
        
    }
}
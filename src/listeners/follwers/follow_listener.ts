
import { ApiClient } from "@twurple/api";
import { EventSubChannelFollowEvent } from "@twurple/eventsub";
import { ChatClient } from '@twurple/chat';
import { Listener } from "../../api/listener/listener_manager";



export class FollowListener implements Listener<EventSubChannelFollowEvent> {

    type(): string {
        return EventSubChannelFollowEvent.name;
    };

    on(event: EventSubChannelFollowEvent, apiClient: ApiClient, chatClient: ChatClient):void {
        event.getBroadcaster().then(r => {
            chatClient.say(r.name, "Danke für dein follow @" + event.userDisplayName).then().catch(reason => {
                console.log(reason);
            });
        }).catch(reason => {
            console.log(reason);
        });
        

    }
}
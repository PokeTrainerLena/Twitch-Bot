
import { ApiClient } from "@twurple/api";
import { EventSubChannelFollowEvent } from "@twurple/eventsub";
import { ChatClient } from "@twurple/chat";
import { Listener, Replacment } from "../../api/listener/listener_manager";
import {follow} from "../../messages/events.json"
import { BasicFunctions } from "../../utils/basic_functions";


export class FollowListener extends BasicFunctions implements Listener<EventSubChannelFollowEvent>   {
    

    type(): string {
        return EventSubChannelFollowEvent.name;
    };

    async on(event: EventSubChannelFollowEvent, apiClient: ApiClient, chatClient: ChatClient) {
        event.getBroadcaster().then(r => {
            var replacment: Replacment = { key: "%NAME%", value: event.userDisplayName };
            this.sendMessage(chatClient,r.name,follow,{replacment:[replacment]});
        }).catch(reason => {
            console.log(reason);
        });
        

    }
}
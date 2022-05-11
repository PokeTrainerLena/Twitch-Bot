
import { ApiClient } from "@twurple/api";
import { EventSubChannelCheerEvent } from "@twurple/eventsub";
import { ChatClient } from '@twurple/chat';
import { Listener, Replacment } from "../../api/listener/listener_manager";
import { cheer } from "../../messages/events.json"
import { BasicFunctions } from "../../utils/basic_functions";



export class CheerListener implements Listener<EventSubChannelCheerEvent> extends BasicFunctions {

    type(): string {
        return EventSubChannelCheerEvent.name;
    };

    async on(event: EventSubChannelCheerEvent, apiClient: ApiClient, chatClient: ChatClient) {
        event.getBroadcaster().then(r => {
            if (!event.isAnonymous) {
                var replacment: Replacment = { key: "%NAME%", value: event.userDisplayName! };
                this.sendMessage(chatClient, r.name, cheer, { replacment: [replacment] });
            } else {
                var replacment: Replacment = { key: "%NAME%", value: "Anonymous" };
                this.sendMessage(chatClient, r.name, cheer, { replacment: [replacment] });
            }

        }).catch(reason => {
            console.log(reason);
        });


    }
}
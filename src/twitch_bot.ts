import { AuthProvider } from "twitch-auth";
import { ChatClient } from "twitch-chat-client";
import { ApiClient } from "twitch";
import { CommandManager } from "./api/commands/command_manager";
import { SocialCommand } from "./commands/social_command";
import crypto from "crypto";
import { EnvPortAdapter, EventSubListener } from "twitch-eventsub";
import { EventManager } from "./api/listener/listener_manager";
import { FollowListener } from "./listeners/follwers/follow_listener";


// Lucario <3
export class TwitchBot {

    private authProvider: AuthProvider;
    private apiClient: ApiClient;
    private chatClient: ChatClient;

    // Manager
    private commandManger: CommandManager;
    private eventManager: EventManager;
    private listener: EventSubListener;

    constructor(authProvider: AuthProvider, eventAuth: AuthProvider) {

        this.authProvider = authProvider;
        this.apiClient = new ApiClient({ authProvider });
        this.chatClient = new ChatClient(authProvider, { channels: ['kleines_lucario'] });
        const eventClient = new ApiClient({authProvider:eventAuth});
        this.listener = new EventSubListener(eventClient, new EnvPortAdapter({
            hostName: 'kleineslucario.herokuapp.com'
        }), crypto.randomBytes(20).toString('hex'));
        
        

        this.commandManger = new CommandManager(this.chatClient, this.apiClient);
        this.eventManager = new EventManager();
    }

    public registerCommands() {
        this.commandManger.add(new SocialCommand());
    }
    public registerEvents() {
        this.eventManager.register(new FollowListener());
    }

    public async start() {
        await this.chatClient.connect()
        const id = await this.apiClient.helix.users.getUserByName("kleines_lucario");
        this.eventManager.start(this.listener, id!, this.apiClient, this.chatClient);
        this.listener.listen();
    }

}

import { CommandManager } from "./api/commands/command_manager";
import { SocialCommand } from "./commands/social_command";
import crypto from "crypto";
import { EventManager } from "./api/listener/listener_manager";
import { FollowListener } from "./listeners/follwers/follow_listener";
import { ApiClient } from "@twurple/api";
import { AuthProvider } from "@twurple/auth";
import { EventSubListener, EnvPortAdapter } from "@twurple/eventsub";
import { ChatClient } from '@twurple/chat';
import { BdayCommand } from "./commands/bday_command";
import { ChatInteractionCommand } from "./commands/interaction_command";


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
        this.chatClient = new ChatClient({ authProvider, channels: ['kleines_lucario'] });
        const eventClient = new ApiClient({ authProvider: eventAuth });
        this.listener = new EventSubListener({
            apiClient: eventClient, adapter: new EnvPortAdapter({
                hostName: 'kleineslucario.herokuapp.com'
            }
            ),
            secret: process.env.secret!,
            logger: {
                minLevel: 7
            }
        });



        this.commandManger = new CommandManager(this.chatClient, this.apiClient);
        this.eventManager = new EventManager();
    }

    public registerCommands() {
        this.commandManger.add(new ChatInteractionCommand());
        this.commandManger.add(new SocialCommand());
        this.commandManger.add(new BdayCommand());
    }
    public registerEvents() {
        this.eventManager.register(new FollowListener());
    }

    public async start() {
        await this.chatClient.connect()
        const id = await this.apiClient.users.getUserByName("kleines_lucario");
        this.eventManager.start(this.listener, id!, this.apiClient, this.chatClient);
        console.log("Bin da!");
        this.listener.listen();
    }

}
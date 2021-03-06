import { CommandManager } from "./api/commands/command_manager";
import { SocialCommand } from "./commands/social_command";
import { EventManager } from "./api/listener/listener_manager";
import { FollowListener } from "./listeners/follwers/follow_listener";
import { ApiClient } from "@twurple/api";
import { EventSubListener, EnvPortAdapter } from "@twurple/eventsub";
import { BdayCommand } from "./commands/bday_command";
import { ChatInteractionCommand } from "./commands/interaction_command";
import { FailCommand } from "./commands/fail_command";
import { FunfactsCommand } from "./commands/funfacts_command";
import { LurkCommand, UnlurkCommand } from "./commands/lurk_command";
import { LurkHandler } from "./handler/lurk_handler";
import { HelpCommand } from "./commands/help_command";
import { ModlobenCommand } from "./commands/modloben_command";
import { NuzlockeCommand } from "./commands/nuzlocke_command";
import { PauseCommand, StopCommand } from "./commands/pause_command";
import { SoCommand } from "./commands/so_command";
import {ChatClient} from "@twurple/chat"
import {AuthProvider} from "@twurple/auth"
import { env } from "process";
import { CHANNEL } from "./utils/constants";
import { PollCommand } from "./commands/poll_command";
//import { CheerListener } from "./listeners/follwers/cheer_listener";

//const
const lurkHandler = new LurkHandler();
const soHandler = new LurkHandler([CHANNEL]);
//const commands = new Map();

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
        this.chatClient = new ChatClient({ authProvider, channels: [CHANNEL] });
        const eventClient = new ApiClient({ authProvider: eventAuth });
        this.listener = new EventSubListener({
            apiClient: eventClient, adapter: new EnvPortAdapter({
                hostName: process.env.HEROKU_APP_NAME + '.herokuapp.com'
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
        this.commandManger.add(new BdayCommand());
        this.commandManger.add(new FailCommand());
        this.commandManger.add(new FunfactsCommand());
        this.commandManger.add(new HelpCommand(this.commandManger.getCommands()));
        this.commandManger.add(new ChatInteractionCommand());
        this.commandManger.add(new LurkCommand(lurkHandler));
        this.commandManger.add(new ModlobenCommand());
        this.commandManger.add(new NuzlockeCommand());
        this.commandManger.add(new PauseCommand(soHandler));
        this.commandManger.add(new StopCommand());
        this.commandManger.add(new SoCommand());
        this.commandManger.add(new SocialCommand());
        this.commandManger.add(new UnlurkCommand(lurkHandler));
        this.commandManger.add(new PollCommand());
        
        

    }
    public registerEvents() {
        this.eventManager.register(new FollowListener());
       // this.eventManager.register(new CheerListener());
    }

    public async start() {
        await this.chatClient.connect()
        const id = await this.apiClient.users.getUserByName(CHANNEL);
        this.eventManager.start(this.listener, id!, this.apiClient, this.chatClient);
        console.log("Bin da!");
        this.listener.listen();
    }

}
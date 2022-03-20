import { AuthProvider } from "twitch-auth";
import { ChatClient } from "twitch-chat-client";
import { ApiClient } from "twitch";
import { CommandManager } from "./api/commands/command_manager";
import { SocialCommand } from "./commands/social_command";


// Lucario <3
export class TwitchBot {

    private authProvider: AuthProvider;
    private apiClient: ApiClient;
    private chatClient: ChatClient;

    // Manager
    private commandManger: CommandManager;

    constructor(authProvider: AuthProvider) {

        this.authProvider = authProvider;
        this.apiClient = new ApiClient({ authProvider });
        this.chatClient = new ChatClient(authProvider, { channels: ['kleines_lucario'] });

        this.commandManger = new CommandManager(this.chatClient, this.apiClient);
    }

    public registerCommands() {
        this.commandManger.add(new SocialCommand());
    }

    public async start() {
        await this.chatClient.connect()
    }

}
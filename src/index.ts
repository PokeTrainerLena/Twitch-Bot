import 'dotenv/config'
import { ClientCredentialsAuthProvider} from "twitch";
import { TwitchBot } from "./twitch_bot";
import { promises as fs } from 'fs';

async function main() {
    const clientId: string = process.env.clientId ?? "";
    const clientSecret = process.env.clientSecret ?? "";
    const auth = new ClientCredentialsAuthProvider(clientId, clientSecret);
    const bot = new TwitchBot(auth);
    await bot.start();
    bot.registerCommands();
    
}

main();


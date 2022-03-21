import 'dotenv/config'
import { TwitchBot } from "./twitch_bot";
import { promises as fs } from 'fs';
import { ClientCredentialsAuthProvider, RefreshingAuthProvider } from '@twurple/auth';

async function main() {
    const clientId: string = process.env.clientId ?? "";
    const clientSecret = process.env.clientSecret ?? "";
    const eventAuth = new ClientCredentialsAuthProvider(clientId, clientSecret);
    const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'utf-8'));
    const authProvider = new RefreshingAuthProvider(
        {
            clientId,
            clientSecret,
            onRefresh: async newTokenData => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'utf-8')
        },
        tokenData
    );

    const bot = new TwitchBot(authProvider, eventAuth);
    await bot.start();
    bot.registerCommands();
    bot.registerEvents();

}

main();


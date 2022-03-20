import 'dotenv/config'
import { RefreshableAuthProvider, StaticAuthProvider } from "twitch";
import { TwitchBot } from "./twitch_bot";
import { promises as fs } from 'fs';

async function main() {
    const clientId: string = process.env.clientId ?? "";
    const clientSecret = process.env.clientSecret ?? "";
    const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'utf-8'));
    const auth = new RefreshableAuthProvider(
        new StaticAuthProvider(clientId, tokenData.accessToken),
        {
            clientSecret,
            refreshToken: tokenData.refreshToken,
            expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
            onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
                const newTokenData = {
                    accessToken,
                    refreshToken,
                    expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
                };
                await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'utf-8')
            }
        }
    );
    const bot = new TwitchBot(auth);
    await bot.start();
    bot.registerCommands();
    
}

main();


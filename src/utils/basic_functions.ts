export class BasicFunctions {


    sendMessage(chatClient: ChatClient, channel: string, message: string | Array<string>, { delay, reply_id, randomDelay = true, replacment }: OptionalHeaders) {

        var exe = () => {
            if (typeof message === "string") {
                !reply_id ? chatClient.say(channel, message) : chatClient.say(channel, message, { replyTo: reply_id });
            } else if (Array.isArray(message)) {
                var finalMessage = message[this.getRandomInt(message.length)] as string;
                if (!(replacment == undefined)) {
                    replacment!.forEach(value => {
                        finalMessage = finalMessage.replaceAll(value.key, value.value);
                    });
                    !reply_id ? chatClient.say(channel, finalMessage) : chatClient.say(channel, finalMessage, { replyTo: reply_id });
                } else {
                    !reply_id ? chatClient.say(channel, finalMessage) : chatClient.say(channel, finalMessage, { replyTo: reply_id });
                }
            }

        };
        if (randomDelay) {
            delay = delay = this.getRandomDelay(message.length);
            console.log(delay);
            setTimeout(exe, delay);
        } else if (!delay) {
            setTimeout(exe, delay);
        } else {
            exe();
        }

    }

    getRandomDelay(chars: number): number {
        return Math.round(MAX_DELAY - (MAX_DELAY- MIN_DELAY) * Math.exp(SENSITY_DELAY * chars)) ;
    }
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    
}
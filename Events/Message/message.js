const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (message.content.startsWith('!topPosts')) {
            message.delete();
            const channel = message.client.channels.cache.get(process.env.CHANNEL_ID);
            const messages = await channel.messages.fetch({ limit: 100 });
            const ratedMessages = messages.map(msg => {
                const upVotes = msg.reactions.cache.get('⬆️')?.count || 0;
                const downVotes = msg.reactions.cache.get('⬇️')?.count || 0;
                const score = upVotes - downVotes;

                return { msg, score };
            });

            ratedMessages.sort((a, b) => b.score - a.score);

            const embed = new EmbedBuilder()
                .setTitle('🧙‍♂️Top posts:')
                .setColor('#0099ff');

            ratedMessages.slice(0, 5).forEach((rm, index) => {
                let messageContent = rm.msg.content;
                if (messageContent.length > 60) {
                    messageContent = messageContent.substring(0, 60) + '...';
                }
                embed.addFields({ name: `Post ${index + 1}`, value: `${messageContent} (Score: ${rm.score})` });
            });

            message.channel.send({ embeds: [embed] });
        }
    }
};
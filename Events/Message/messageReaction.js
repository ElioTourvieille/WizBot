
module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Erreur lors de la récupération du message :', error);
                return;
            }
        }

        const message = reaction.message;

        if (reaction.emoji.name === '⬆️' || reaction.emoji.name === '⬇️') {
            const upVotes = message.reactions.cache.get('⬆️')?.count || 0;
            const downVotes = message.reactions.cache.get('⬇️')?.count || 0;

            console.log(`ID du message : ${message.id}, Likes : ${upVotes}, Dislikes : ${downVotes}`);
        }
    }
};


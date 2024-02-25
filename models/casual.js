const casual = require('casual');
const mongoose = require('mongoose');
const User = require('./User');
const Thought = require('./Thought');
const Reaction = require('./Reaction');

mongoose.connect('mongodb://localhost:27017/ThoughtBuddy', { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {
 for (let i = 0; i < 100; i++) {
    const username = casual.userName();
    const email = casual.email();
    const user = new User({ username, email });
    await user.save();

    for (let j = 0; j < 10; j++) {
        const thoughtText = casual.sentence();
        const thought = new Thought({ thoughtText, username });
        await thought.save();

        for (let k = 0; k < 3; k++) {
            const reactionBody = casual.words(3);
            const reaction = new Reaction({ reactionBody, username });
            thought.reactions.push(reaction);
        }
            await thought.save();
        }

     }

    console.log('Data seeded');
    process.exit();
}

seedDatabase();
const casual = require('casual');
const mongoose = require('mongoose');
const User = require('./User');
const Thought = require('./Thought');

mongoose.connect('mongodb://localhost:27017/ThoughtBuddy', { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    const users = [];

   
    for (let i = 0; i < 50; i++) {
        const username = casual.username;
        const email = casual.email;
        const user = new User({ username, email });
        await user.save();
        users.push(user);
    }

    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        for (let j = 0; j < 10; j++) {
            const thoughtText = casual.sentence;
            const thought = new Thought({ thoughtText, username: user.username });

            for (let k = 0; k < 3; k++) {
                const reactionBody = casual.words(3);
                const reactionUsername = casual.random_element(users).username;
                const reaction = { reactionBody, username: reactionUsername };
                thought.reactions.push(reaction);
            }
            await thought.save();
        }
    }


    for (let user of users) {
        const friends = users.filter(u => u._id.toString() !== user._id.toString());
        user.friends = friends.slice(0, 5).map(friend => friend._id);
        await user.save();
    }

    console.log('Data seeded');
    process.exit();
}

seedDatabase();
const faker = require('faker');
const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });

async function seedUsers() {
 await User.deleteMany({});

 for (let i = 0; i < 100; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const user = new User({ username, email });
    
    await user.save();
     }

    console.log('Users seeded');
    process.exit();
}

seedUsers();
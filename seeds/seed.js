const sequelize = require('../config/connection');
const { Post, User } = require('../models');
const postData = require('./postData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        // First seed the User table
        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const userId = users[0].id;
        postData.forEach(post => post.user_id = userId);

        // Then seed the Post table
        await Post.bulkCreate(postData);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding the database:', err);
        process.exit(1);
    }
};

seedDatabase();

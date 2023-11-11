const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

Post.belongsTo(User, {
    foreignKey: 'userId',
  });
  

module.exports = { User, Post, Comment };

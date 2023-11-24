const { Post, User, Comment } = require("../models");

exports.getPosts = async (req, res) => {
  console.log("GET POST");
  try {
    postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    postData = postData.map((post) => post.get({ plain: true }));

    res.render("home", { postData });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post-details", { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user_id,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.updatePost = async (req, res) => {
  if (!req.session.logged_in) {
    return res
      .status(403)
      .json({ message: "You must be logged in to perform this action" });
  }

  const { title, content } = req.body;
  const postData = { title, content };

  try {
    const [updatedRowCount] = await Post.update(postData, {
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (updatedRowCount === 0) {
      return res
        .status(404)
        .json({
          message:
            "No post found with this id, or you do not have permission to update it.",
        });
    }

    res.redirect("/dashboard");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating post. Please try again later." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

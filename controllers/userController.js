const { User, Thought } = require("../models");

const UserController = {
  // 1.  Getting all users
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findById({ _id: params.id })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        return Thought.deleteMany({ userId: userData._id });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addFriend({ params, body }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = UserController;

const { User } = require('../models');

const UserController = {
    // 1.  Getting all users
  getAllUsers(req, res) {
    User.find({})
        .then(userData => res.json(userData))
        .catch(err => 
            console.log(err);
            res.status(500).json(err));
        },

getUserById({ params }, res) {
    User.findById({ _id: params.id })
    .catch(err => 
        console.log(err);
        res.status(500).json(err));
    },

createUser(req, res) {
    User.create(req.body)
    .then(userData => res.json(userData))
    .catch(err => 
        console.log(err);
        res.status(500).json(err));
    },

updateUser({ params, body }, res) {
    User.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(userData);
    })
    .catch(err => 
        console.log(err);
        res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err =>
            console.log(err);
            res.status(500).json(err));
        },

        addFriend(req, res) {
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            },

            removeFriend( params , res) {
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: req.params.friendId } },
                    { new: true }
                )
                .then(userData) => {
                    if (!userData) {
                        res.status(404).json({ message: 'No user found with this id!' });
                        return;
                    }
                    res.json(userData);
                }
            })
            .catch(err => res.status(400).json(err));
        },
    };

    module.exports = UserController;
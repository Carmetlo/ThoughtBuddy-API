const { User } = require('../models');

const UserController = {
    // 1.  Getting all users
    getAllUsers(req, res) {
        User.find({})
           .then(userData => res.json(userData))
           .catch(err => {
               console.log(err);
               res.status(400).json(err));
           },
    getUserById(req, res) {
        User.findById(req.params.userData)
const {Thought, User, Reaction} = require('../models');
const {Types, get} = require('mongoose');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({message: 'No thought found!'});
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {$push: {thoughts: thought._id}},
                {new: true}
            );
            res.status(201).json({message: 'Thought created!'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought) {
                res.status(404).json({message: 'No thought found!'});
            } else {
                res.json({message: 'Thought deleted!'});
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({message: 'No thought found!'});
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: {reactionBody: req.body.reactionBody, username: req.body.username, userId: req.body.userId}}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404).json({message: 'No thought found!'});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {_id: req.params.reactionId}}},
                {runValidators: true, new: true}
            );

            thought ? res.json(thought) : res.status(404).json({message: 'No thought found!'});
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

module.exports = thoughtController;
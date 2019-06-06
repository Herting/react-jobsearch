module.exports = () => {
    let express = require('express');
    let router = express.Router();

    const mongoose = require('mongoose');

    let Category = mongoose.model('Category', {
        title: String
    });

    /****** Routes *****/
    router.get('/', (req, res) => {
        Category.find({}, (err, categories) => {
            res.send(categories);
        })
    });

    router.post('/create', (req, res) => {
        let title = req.body.title;

        let newCategory = new Category({
            title: title
        });

        newCategory.save((err) => {
            if (err) {
                console.error(err);
            } else {
                res.json({msg: `You have posted this data: ${req.body}`});
            }
        })
    });

    return router;
};
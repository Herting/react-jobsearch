module.exports = () => {
    let express = require('express');
    let router = express.Router();

    const mongoose = require('mongoose');

    let Area = mongoose.model('Area', {
        title: String
    });

    /****** Routes *****/
    router.get('/', (req, res) => {
        Area.find({}, (err, areas) => {
            res.send(areas);
        })
    });

    router.post('/create', (req, res) => {
        let title = req.body.title;

        let newArea = new Area({
            title: title
        });

        newArea.save((err) => {
            if (err) {
                console.error(err);
            } else {
                res.json({msg: `You have posted this data: ${req.body}`});
            }
        })
    });

    return router;
};
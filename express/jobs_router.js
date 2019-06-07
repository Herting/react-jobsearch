module.exports = () => {
    let express = require('express');
    let router = express.Router();

    const mongoose = require('mongoose');

    let Job = mongoose.model('Job', {
        title: String,
        description: String,
        category: String,
        area: String
    });

    /****** Routes *****/
    router.get('/', (req, res) => {
        Job.find({}, (err, jobs) => {
            res.send(jobs);
        })
    });

    router.get('/job/:id', (req, res) => {
        Job.findOne({_id: req.params.id}, (err, job) => {
            res.send(job);
        })
    });

    router.get('/user/:user_id', (req, res) => {
        Job.find({user_id: req.params.user_id}).exec(function (err, jobs) {
            res.send(jobs);
        })
    });

    router.post('/create', (req, res) => {
        let title = req.body.title;
        let description = req.body.description;
        let category = req.body.category;
        let area = req.body.area;
        //let user_id = req.body.user_id;

        let newJob = new Job({
            title: title,
            description: description,
            category: category,
            area: area,
            //user_id: user_id
        });

        newJob.save((err) => {
            if (err) {
                console.error(err);
            } else {
                res.json({msg: `You have posted this data: ${req.body}`});
            }
        })
    });

    return router;
};
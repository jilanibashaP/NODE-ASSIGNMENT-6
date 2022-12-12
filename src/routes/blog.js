const router = require('express').Router();

const Blogs = require('../models/Blog')

const bodyParser = require("body-parser")

// Your routing code goes here
router.use(bodyParser.json())

router.get('/blog', async (req, res) => {
    // res.json({ok:'blog'})
    // console.log(req.query)
    console.log(Object.keys(req.query).length)
    try {
        if (Object.keys(req.query).length === 0) {
            const data = await Blogs.find()
            res.status(200).json({
                status: "success",
                result: data
            })
        } else {
            const data = await Blogs.find({ topic: req.query.search })
            res.status(200).json({
                status: "success",
                result: data
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.post('/blog', async (req, res) => {
    // res.json({ok:'blog'})
    // console.log(req.query) 
    // console.log(req.body)

    try {
        const data = await Blogs.create(req.body)
        console.log(data)
        res.status(201).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.put('/blog/:_id', async (req, res) => {
    try {
        const data = await Blogs.updateOne({ _id: req.params._id }, req.body)
        res.status(200).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.delete('/blog/:_id', async (req, res) => {
    try {
        const data = await Blogs.deleteOne({ _id: req.params._id })
        res.status(200).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
module.exports = router;
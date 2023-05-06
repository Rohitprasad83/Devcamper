const Bootcamp = require('../models/Bootcamp')

//@desc Get All Bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootCamps = async(req, res, next) => {
    const data = await Bootcamp.find({})
    res.status(200).json({ success: true, count: data.length, data })
}

//@desc Create new Bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootCamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({ success: true, data: bootcamp })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message })
    }
}

//@desc Get one bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootCamp = async(req, res, next) => {
    try {
        const data = await Bootcamp.findById(req.params.id)
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        next(err)
    }
}

//@desc Update a bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootCamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!bootcamp) {
            return res.status(400).json({ success: false, error: err.message })
        }
        res.status(200).json({ success: true, data: bootcamp })
    } catch (err) {
        res.status(400).json({ success: false, error: err.message })
    }
}

//@desc Delete a bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootCamp = async(req, res, next) => {
    const data = await Bootcamp.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: 'Bootcamp deleted' })
}
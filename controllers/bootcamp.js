const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/ErrorResponse')

//@desc Get All Bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootCamps = asyncHandler(async(req, res, next) => {
    const data = await Bootcamp.find({})
    res.status(200).json({ success: true, count: data.length, data })
    next(err)
})

//@desc Create new Bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootCamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({ success: true, data: bootcamp })
    next(err)
})

//@desc Get one bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootCamp = asyncHandler(async(req, res, next) => {
    const data = await Bootcamp.findById(req.params.id)
    if (!data) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({ success: true, data: data })
    next(err)
})

//@desc Update a bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootCamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!bootcamp) {
        return res.status(400).json({ success: false, error: err.message })
    }
    res.status(200).json({ success: true, data: bootcamp })
    next(err)
})

//@desc Delete a bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootCamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
        return res.status(400).json({ success: false, error: err.message })
    }
    res.status(200).json({ success: true, data: 'Bootcamp deleted' })
    next(err)
})
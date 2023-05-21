const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
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

//@desc Get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
    const { zipcode, distance } = req.params

    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lng = loc[0].longitude

    //Calc radius using radians
    //Divide dist by radius of Earth
    // Earth Radius = 3963 miles /6378 km
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [
                    [lng, lat], radius
                ] } },
    })

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    })
})
const Bootcamp = require('../models/Bootcamp')

exports.getBootCamps = async(req, res, next) => {
    const data = BootCamp.find({})
    res.status(200).json({ success: true, data: data })
}

exports.createBootCamp = (req, res, next) => {
    res.status(201).json({ success: true, data: 'BootCamp Created' })
}

exports.getBootCamp = (req, res, next) => {
    res.status(200).json({ success: true, data: 'BootCamp' })
}

exports.updateBootCamp = (req, res, next) => {
    res.status(200).json({ success: true, data: 'BootCamp updated' })
}

exports.deleteBootCamp = (req, res, next) => {
    res.status(200).json({ success: true, data: 'Bootcamp deleted' })
}
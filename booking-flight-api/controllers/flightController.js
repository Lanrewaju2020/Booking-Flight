const { FlightModel } = require('../models/Flight')
const { flightValidation } = require('./flightValidation');
const fs = require('fs')
const { saveFlightData, getFlightData } = require('./utils')
const dataPath = '../data.json'
exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}



const FlightController = {
    async addFlight(req, res) {
        const { error, value } = flightValidation(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                error
            })
        }
        const flightId = Math.floor(Math.random() * 10000)
        let existData = getFlightData()
        existData[flightId] = value
        saveFlightData(existData)
        value["id"] = flightId

        return res.status(200).json({
            status: 'success',
            flight: value
        })
    },
    async getFlight(req, res) {
        const existData = getFlightData()
        return res.status(200).json({
            status: 'success',
            data: existData
        })
    },
    async getAFlight(req, res) {
        const id = req.params.id;
        console.log(id)
        const existData = getFlightData()
        const flight = existData[id]
        if (!flight) {
            return res.status(400).json({
                status: 'error',
                error: 'Flight with Id not found'
            })
        }
        return res.status(200).json({
            status: 'success',
            flight
        })
    },
    async updateFlight(req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            const id = req.params.id;
            const existData = getFlightData()
            existData[id] = req.body
            saveFlightData(existData)
            return res.status(200).json({
                status: 'success',
                flight
            }, true)
        })

    },
    async deleteFlight(req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            const id = req.params.id;
            const existData = getFlightData()
            const datas = existData[id];
            if (!datas) {
                return res.status(400).json({
                    status: 'error',
                    message: `${id} not found`
                })
            }
            delete existData[id];
            saveFlightData(existData)
            console.log(existData)
            return res.status(200).json({
                status: 'success',
                message: 'Successfully deleted'
            })
        }, true)
    }
}


module.exports = FlightController;
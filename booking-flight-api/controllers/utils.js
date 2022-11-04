const fs = require('fs')
const dataPath = '../data.json'
exports.saveFlightData = (data) => {
    const stringData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringData)
}

exports.getFlightData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}
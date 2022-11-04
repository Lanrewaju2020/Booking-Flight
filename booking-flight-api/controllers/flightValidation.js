const joi = require('joi');

exports.flightValidation = (payload) => {
    const schema = joi.object({
        title: joi.string().required(),
        time: joi.number().required(),
        price: joi.number().required(),
        date: joi.date().required()
    })
    return schema.validate(payload)
}
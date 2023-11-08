const Joi = require('joi')

const list = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer().default(10),
        page: Joi.number().integer().default(1),
    }),
}

module.exports = {
    list
}
const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const sessionController = require('./controllers/sessionControl');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const routes = express.Router();


routes.post('/sessions', celebrate({
    [Segments.BODY]:Joi.object().keys({
        id: Joi.string().required()
    })
}), sessionController.create);

routes.get('/ongs',ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email : Joi.string().required().email(),
        whatsapp: Joi.number().required().min(1000000000).max(99999999999),
        city : Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index);


routes.post('/incidents', celebrate({
    [Segments.HEADERS]:Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(10),
        value : Joi.number().required().min(1)
    })
}), incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

module.exports = routes;
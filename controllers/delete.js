var es = require('../configs/es');
var joi = require('joi');
var token = require('../utils/token').token;

function controller(request, reply) {
    var elementId = request.params.id,
        ValidToken = token(request.headers),
        result = {};

    if (!ValidToken.type) {
        reply(ValidToken);
        return;
    }

    joi.validate(
        { id: elementId },
        { id: joi.number() },
    function (err, value) {
        if (err) {
            reply(err);
            return;
        }

        var esObject = {
            index: 'customelements',
            type: 'repo',
            id: elementId,
        };

        es.delete(esObject).then(function (body) {
            result.type = 'success';
            result.result = body;
            reply( result );
        }, function (error) {
            result.type = 'error';
            result.message = error.message;
            reply(result);
        });
    });
}

module.exports = controller;
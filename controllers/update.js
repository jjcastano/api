var env = require('../config/env');
var token = require('../utils/token').token;
var elasticsearch = require('elasticsearch');
var Joi = require('joi');

var client = new elasticsearch.Client({
    host: env.ES_URL
});

// Busca item pelo ID
module.exports = function(request, reply) {

    var element = JSON.parse(request.payload),
        elementId = request.params.id,
        ValidToken = token(request.headers),
        result = {};

    if ( !ValidToken.type ) {
        reply( ValidToken );
        return;
    }

    Joi.validate(
        { id: elementId }, 
        { id: Joi.number() }, 
    function (err, value) {

            if ( err ) {
                reply(err);
                return;
            };

            var esObject = {
                index: 'customelements',
                type: 'repo',
                id: element.id,
                body: {
                    doc: element
                }
            };

            client.update(
                esObject
            ).then(function (body) {

                    result.type = 'success';
                    result.result = body;
                    reply( result );

            }, function (error) {

                    result.type = 'error';
                    result.message = error.message;
                    reply(result);

            });

        });

};

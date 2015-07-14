module.exports = [
    {
        method: 'GET',
        path: '/search/{type}',
        handler: require('./controllers/search/type/get.js')
    },
    {
        method: 'PUT',
        path: '/sync/{type}',
        handler: require('./controllers/sync/type/put.js')
    },
    {
        method: 'GET',
        path: '/owners/{ownerID}',
        handler: require('./controllers/owners/owner/get.js')
    }
];

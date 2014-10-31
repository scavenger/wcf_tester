var Hapi = require('hapi');
var Good = require('good');
var WcfRepoAdapter = require('./lib/wcfServRepo');

var server = Hapi.createServer('localhost', process.env.PORT || 27321, {
    cors: true
});


server.route({
    method: 'GET',
    path: '/',    
    handler: function (request, reply) {
        reply('I am alive');
    }
});

server.pack.register([
    { 
        plugin: Good 
    },
    {
        plugin: WcfRepoAdapter,
        options: {
            collection : 'wcfservice'
        }
    }],
    function() {
        server.start(function () {
            console.log('Server started at: ' + server.info.uri);
        })
});


var Hapi = require('hapi');
var Good = require('good');
var WcfRepoAdapter = require('./lib/wcfServRepo');
 
var server = new Hapi.Server('localhost', 27321);

server.views( {
	engines: {
            html: require('handlebars')
        },
        path: __dirname + '/lib/login/templates',
        partialsPath: __dirname + '/lib/login/templates',
        layout: true
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
    },
	{ plugin: require('lout') },
    { plugin: require('bell') },
    { plugin: require('hapi-auth-cookie')},
    { plugin: require('./lib/login/plugins/auth')}
  ], 
	function(err) { 
		if(err) throw err;
		
		server.route([
	{	
		path: '/myprofile',
		method: 'GET',
		config: {
			auth: 'session',
			handler: function(request, reply) {
				reply('<html><head><title>Login page</title></head><body><h3>Welcome '
				  + JSON.stringify(request.auth.credentials, null, 4)
				  + '!</h3><br/><form method="get" action="/logout">'
				  + '<input type="submit" value="Logout">'
				  + '</form></body></html>');
			}
		}
	}, 
	{
		path: '/',
		method: 'GET',
		config: {  // try with redirectTo disabled makes isAuthenticated usefully available
			auth: {
				strategy: 'session',
				mode: 'try'
			},
			plugins: { 'hapi-auth-cookie': { redirectTo: false } }
		},
		handler: function(request, reply) {
			reply.view('index', {
				auth: JSON.stringify(request.auth),
				session: JSON.stringify(request.session),
				isLoggedIn: request.auth.isAuthenticated
			});
		}
	}, {
		path: '/{path*}',
		method: 'GET',
		handler: {
			directory: {
				path: './lib/login/public',
				listing: false,
				index: true
			}
		}
	}
]);
		
		server.start(function() {
			console.log('Server started at: ' + server.info.uri);
		});
	}
);
	
	




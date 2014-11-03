
var Hapi = require('hapi');
var Good = require('good');
var soap = require('soap');
var WcfRepoAdapter = require('./lib/wcfServRepo');
var caller = require('./lib/wcfcaller');

var server = Hapi.createServer('localhost', process.env.PORT || 27321, {
    cors: true
});


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
	   },
		{
			path: '/testservice',
			method : 'POST',
			handler : function(request, reply) {
				var url = request.payload.url;
				
				console.log(url);
				
				soap.createClient(url, function(err, client){
					if(!client) {
						reply([]);
						return;
					}
					
					var methods = [];
					
					var callList = caller.buildCallList(client);
					callList.forEach(function(el, idx){
							methods.push(el.method);
					});
					
					reply(methods);
				});
			}
		},
		
		{
			path: '/testmethod',
			method : 'POST',
			handler : function(request,reply) { 
			
				var url = request.payload.url;
				var method = request.payload.method;
				
				soap.createClient(url, function(err, client){
					if(client){ // it should be always true 
					
						var callList = caller.buildCallList(client);
						
						callList.forEach(function(el, idx){ 
							// search for api input 
							if(el.method === method) {
									client[method](el.input, function(err, result) {
										reply(result[el.output].ErrorCode);
									});
								return;
							}
						});
					}
				});
			}
		}
	]);
		
		server.start(function() {
			console.log('Server started at: ' + server.info.uri);
		});
	}
);
	


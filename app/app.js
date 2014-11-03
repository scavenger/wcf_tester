var events = require('events');
var eventEmitter = new events.EventEmitter();
var request = require('request');
var q = request('Q');

var app = {
	
	SERVICES_URL : 'http://localhost:27321',
	
	services: [],

	//
	// returns a promise for later retrieval of results (as JSON)
	// 
	getAllServices : function() {
		var deff = Q.defer(); 
		request.get( {url : SERVICES_URL + '/services' } , function(err, res, body) {
			if(err) deff.reject(err) 
			else deff.resolve(JSON.parse(body));
		});
		
		return deff.promise;
	},
	
	//
	// add the service in db, given its name 
	// 
	addService: function (service) {
	
		var self = this;
		
		request.post({
				url : SERVICES_URL + '/services',
				form : { 
					uri : service
				}
			}, 
			function(err, res, body) {
				if(!err && res.statusCode == 200) {
					self.services.push(service);
					eventEmitter.emit('addService'); 
				}
			}
		);
	},
	
	//
	// deletes a service given its name 
	// 
	deleteService : function(service) { 
		
		var self = this;
		
		// need to find mongo _id first , then delete the service using it 
		request.post( { 
			url : SERVICES_URL + '/services/find' ,
			form : {
				uri : service
			}
		}, function(err, res, body) {
			
			if(!err && res.statusCode == 200) {
				
				var dbServices = JSON.parse(body);
				
				if( ! dbServices ||  dbServices.length == 0) return ;
				
				var dbServId = dbServices[0]._id;
				
				request.del( {url : SERVICES_URL + '/services/' + dbServId}, function(err, res, body) {
					if(!err && res.statusCode == 200) {
						
						remove_item(self.services, service);
						eventEmitter.emit('addService'); 
					}
				});
			}
		});
	},

	onAddService: function(handler) {
		eventEmitter.on('addService', handler);
	}
};


// helper for deleting a specific value from an array 
remove_item = function (arr, value) {
    var b = '';
    for (b in arr) {
        if (arr[b] === value) {
            arr.splice(b, 1);
            break;
        }
    }
    return arr;
}


module.exports = app;
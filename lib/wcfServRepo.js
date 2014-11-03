var MongoClient = require('mongodb').MongoClient;
var Tooth = require('toothache');
var Joi = require('joi');

var internals = {} ; 

internals.DbAdapter = function() {
    this.defaultConnection = 'mongodb://10.105.13.28:27017';
    this.defaultCollection = 'wcfservice';
}

internals.CRUD = {
    
    // Create options
    create: {
        access: 'normal',  // Sets which role can create ,
        payload: Joi.object().keys({ 
            uri: Joi.string().required()
        })
    }, 
    read: {
        access: 'normal'  
    },
    // Update options
    update: {
        date: 'updated',    // Sets 'updated' field to be dated at doc update
        access: 'normal' // Sets which role can update  
    },
    // Delete options
    del: {
        access: 'normal' // Sets which role can update 
    }
};


exports.register = function (plugin, options, next) {
        var options = options || '' ;
    
        var dbAdapter = new internals.DbAdapter();
        
        if(options.connPath) { 
            dbAdapter.defaultConnection = options.connPath;
        }
        
        if(options.collection) { 
            dbAdapter.defaultCollection  = options.collection;
        }
        
        dbAdapter.defaultConnection = dbAdapter.defaultConnection.concat('/' ,dbAdapter.defaultCollection);
        
        MongoClient.connect(dbAdapter.defaultConnection, function(err, db) {
            if(err) throw err;
        
            internals.CRUD.db = db;
            internals.CRUD.collection = dbAdapter.defaultCollection;
			
            var WCFServicesRepo = Tooth(internals.CRUD);
            
            
            // register rest api routes 
            
            // Create
            plugin.route({
                method: 'POST', 
                path: '/services',
                config: {
                    handler: WCFServicesRepo.create
                }
            });

            // Get a resource, must use 'id' parameter to refer to mongo's '_id' field
            plugin.route({
                method: 'GET',
                path: '/services/{id}',
                config: {
                    handler: WCFServicesRepo.get
                }
            });

            // Get All
            plugin.route({
                method: 'GET', 
                path: '/services',
                config: {
                    handler: WCFServicesRepo.find
                }
            });

            // Find, will search collection using payload for criteria
            plugin.route({
                method: 'POST',
                path: '/services/find',
                config: {
                    handler: WCFServicesRepo.find
                }
            });

            // Update, must use 'id' parameter to refer to mongo's '_id' field
            plugin.route({
                method: 'PUT', 
                path: '/services/{id}',
                config: {
                    handler: WCFServicesRepo.update
                }
            });

            // Delete, must use 'id' parameter to refer to mongo's '_id' field
            plugin.route({
                method: 'DELETE', 
                path: '/services/{id}',
                config: {
                    handler: WCFServicesRepo.del
                }
            });
        });
        
        next();
};

exports.register.attributes = {
    pkg: {
        "name": "wcfServRepo",
        "version": "0.0.1",
        "description": "TODO",
        "main": "wcfServRepo.js"
    }
};

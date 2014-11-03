var soap = require('soap');
var caller = require('../lib/wcfcaller');

var url = 'http://buch-cristianmi.sparkware.corp/ODS/Services/DictionariesService.svc?wsdl';

soap.createClient(url, function(err, client){
	if(!err){
		var callList = caller.buildCallList(client);
		callList.forEach(function(el, idx){

			client[el.method](el.input, function(err, result) {
				console.log(el.method + ' => ' + err);
			});
		});
	}
});
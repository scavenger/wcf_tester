var soap = require('soap');
var caller = require('../lib/wcfcaller');

var url = 'http://localhost/ODS/Services/AccountService.svc?wsdl'; //'http://buch-cristianmi.sparkware.corp/ODS/Services/DictionariesService.svc?wsdl';

soap.createClient(url, function(err, client){
	if(client){
		var callList = caller.buildCallList(client);
		var noOfMethods = callList.length;
		var finished = 0;

		callList.forEach(function(el, idx){

			client[el.method](el.input, function(err, result) {
				
				finished++;

				console.log(el.method + ' => ' +  JSON.stringify(result[el.output].ErrorCode));
				allIsDone(noOfMethods, finished);
			});

		});
	}else{
		console.log('Incorrect WSDL url!');
	}
});

function allIsDone(total, current){
	if(total == current){
		console.log('>> ALL is DONE!')
	}
}
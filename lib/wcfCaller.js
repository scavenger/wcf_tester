
exports.getNamespaces = function (client){
	if(!client){
		return null;
	}

	var namespaces = {};
	for(var schema in client.wsdl.definitions.schemas){
		namespaces[schema] = [];		
	}	

	return namespaces;
};

exports.buildCallList = function (client, isOutput){

	var typesDict = getTypesDict(client); // TODO: cache them!

	var descriptors = client.describe();
	var allObjects = [];

	var theRoot;
	for(var prop in descriptors){
		for(var prop2 in descriptors[prop]){
			theRoot = descriptors[prop][prop2];
			break;
		}
		break;
	}

	var direction = isOutput ? "output" : "input";

	for(var method in theRoot){
		for(var request in theRoot[method][direction]){
			var requestType = theRoot[method][direction][request];
			var arrRequestType = requestType.split(':');

			if(arrRequestType.length > 1){
				requestType = arrRequestType[1];
			}

			var requestObj = {};
			requestObj[requestType] = {}

			for(var ns in typesDict){
				var innerTypes = typesDict[ns];
				
				for(var innerType in innerTypes){
					if(innerType == requestType){					

						for(var subInnerType in innerTypes[innerType]){
							var primitiveType = getMockPrimitive(innerTypes[innerType][subInnerType]);
							if(primitiveType){
								requestObj[requestType][subInnerType] = primitiveType;	
							}else{
								
								var baseType = innerTypes[innerType][subInnerType].type || innerTypes[innerType][subInnerType].base;
								if(baseType && baseType != subInnerType){
									var arrBaseType = baseType.split(':');
									if(arrBaseType.length > 1){
										baseType = arrBaseType[1];
									}
									
									requestObj[requestType][subInnerType] = {};	
									if(baseType == subInnerType){

										subBuildTypes(typesDict, baseType, requestObj[requestType]);									

									}else{

										requestObj[requestType][subInnerType][baseType] = {};								
										console.log("2. " + JSON.stringify(requestObj));

										subBuildTypes(typesDict, baseType, requestObj[requestType][subInnerType]);									
									}
								}else{
									requestObj[requestType][subInnerType] = {};								
									subBuildTypes(typesDict, subInnerType, requestObj[requestType]);									
								}
							}
						}

						break;
					}
				}
			}

			var outputName;
			for(var output in theRoot[method].output){
				outputName = output;
				break;
			}

			allObjects.push({
				method : method, 
				input: requestObj,
				output: outputName
			});
		}
	}

	return allObjects;
};


function getTypesDict(client){
	if(!client){
		return null;
	}

	var types = {};	
	for(var schema in client.wsdl.definitions.schemas){

		var typesPerSchema = {};
		
		var complexTypes = client.wsdl.definitions.schemas[schema].complexTypes;
		for(var complexType in complexTypes){

			var parent = complexTypes[complexType];
			typesPerSchema[complexType] = {};

			processType(typesPerSchema[complexType], schema, parent, complexType);
		}

		types[schema] = typesPerSchema;
	}

	return types;	
}

function subBuildTypes(typesDict, theType, requestObj){
	if(!requestObj[theType]){
		return false;
	}

	for(var ns in typesDict){
		var innerTypes = typesDict[ns]; // ???
		
		for(var innerType in innerTypes){		

			if(innerType ==  theType){					
				for(var subInnerType in innerTypes[innerType]){

					var primitiveType = getMockPrimitive(innerTypes[innerType][subInnerType]);					
					if(primitiveType){		
						requestObj[theType][subInnerType] = primitiveType;							
					}else{
						requestObj[theType][subInnerType] = {};
						subBuildTypes(typesDict, subInnerType, requestObj[theType]);											
					}					
				}

				break;
			}
		}
	}
}

function getMockPrimitive(typeObj){

	var primitiveType = typeObj.type || typeObj.base;
	if(!primitiveType){
		return null;
	}

	switch(primitiveType){
		case "xs:anyType":
			return "??";
		case "xs:anyURI":
			return "http://localhost";
		case "xs:base64Binary":
			return "??";
		case "xs:boolean":
			return "false";
		case "xs:byte":
			return 9;
		case "xs:dateTime":
			return '01/01/2014';
		case "xs:decimal":
			return 10.0;
		case "xs:double":
			return 11.0;
		case "xs:float":
			return 12.0;
		case "xs:int":			
			return 1000008;
		case "xs:long":
			return 14;
		case "xs:QName":
			return 'q_name';
		case "xs:short":
			return 15;
		case "xs:string":
			return "test";
		case "xs:unsignedByte":
			return 16;
		case "xs:unsignedInt":
			return 17;
		case "xs:unsignedLong":
			return 18;
		case "xs:unsignedShort":
			return 19;
		case "tns:duration":
			return 20;
	}

	return null;
}


function buildType(request, currentType, typesDict){
	if(!currentType){
		return;
	}
	var typeName = currentType.name;
	request.typeName = {};

	buildType(request, currentType.child, typesDict);
}

function processType(typesDict, schema, parentType, parentName){
	if(!parentType.children || parentType.children.length == 0){
		return;
	}

	for(var child in parentType.children){

		var absoluteParent = typesDict;
		child = parentType.children[child];
		var name = parentName;

		if(child['nsName'] != "xs:complexContent"
			&& child['nsName'] != "xs:sequence"){

			name = child['$name'];
			var absoluteName = name || child['$base'] || child['$type'];
			var arrAbsoluteName = absoluteName.split(':');
			if(arrAbsoluteName.length > 1){
				absoluteName = arrAbsoluteName[1];
			}

			typesDict[absoluteName] = {
				'nsName': child['nsName'],
				'name': name,
				'type': child['$type'],
				'occurs': child['$minOccurs'],
				'parent': parentName,
				'base': child['$base'] || child['$type'],
				'child': 0,
				'xmlns': child['xmlns']
			};

			//absoluteParent = typesDict[absoluteName];

			for(var xmlns in child['xmlns']){
				var ns = child['xmlns'][xmlns];
				//#namespaces[ns].push(xmlns);					
			}
		}

		processType(absoluteParent, schema, child, name);
	}
}
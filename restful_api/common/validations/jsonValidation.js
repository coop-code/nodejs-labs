//Check if the input type is application/json
function isValidInput(content_type) {
  return content_type.includes('application/json');
}

function isValidJson (json){
	console.log(typeof(json));
	var jsonString = JSON.stringify(json);
	try{
        if (JSON.parse(jsonString)){
        	return true;
        }
        return false;
    }
    catch (error){
        console.log(error);
        return false;
    }
}

exports.isValidInput = isValidInput;
exports.isValidJson = isValidJson;

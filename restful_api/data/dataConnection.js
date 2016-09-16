//Import driver
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var objectID = require('mongodb').ObjectID;
var fs = require('fs');

//Connection URL (local mongodb server)
var url = 'mongodb://127.0.0.1:27017/test';

/*Import "techProducts" into "test" database*/
function importData (dataName) {
	mongoClient.connect(url, function (err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);
		} else {
			console.log ('Connection OK!');

			var collection = db.collection(dataName);

			try {
				var techProducts = JSON.parse(fs.readFileSync(__dirname + '/tech_products.json', 'utf8'));
				console.log(techProducts);
				collection.insertMany(techProducts, function (err, result){
					if (err){
						console.log(err);
					} else {
						console.log ('Added %d documentos into the %s collection', result.ops.length, dataName);
						db.close();
					}
				});
			} catch(error){
				console.log(error.message);
			}
		}
	});
}


/*Get All products (fields name, brand and price)*/
function GetAllProducts(response){

	mongoClient.connect(url, function (err, db){
		if (err) {
			console.log ('Connection Failed. Error: ', err);

		} else {
			console.log ('Connection OK!');
			var collection = db.collection('tech_products');
			/*Fields id, name and brand are returned. {} means no filters*/
			collection.find({}, { name: 1, brand: 1, price: 1, _id : 0 }).toArray(function(err, result){
				response.send(result);
			});

			db.close();
		}
	});

}

exports.importData = importData;
exports.GetAllProducts = GetAllProducts;

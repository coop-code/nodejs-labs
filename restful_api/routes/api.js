
var express = require('express');
var router = express.Router();
var jsonValidator = require('../common/validations/jsonValidation.js');
var numberValidator = require('../common/validations/numberValidation.js');
var dataConnection = require ('../data/dataConnection.js');
var constants = require ('../common/const.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Products static file (just for basic operations)
 */
var products = [
                {
                	"id": "0",
                	"name": "Keyboard",
                	"brand": "Logitech"
                },
                {
                	"id": "1",
                	"name": "Mouse",
                	"brand": "Microsoft"
                },
                {
                	"id": "2",
                	"name": "Motherboard",
                	"brand": "Asus"
                },
                ];

/*This section handles a local JSON (products) based on HTPP request type*/

/* GET products listing. */
router.get('/products/', function (req, res, next) {
	res.json(products);
});

/* GET a specific product */
router.get('/product/:id', function (req, res, next) {

	//The ID must be a number 
	if (numberValidator.isNumeric(req.params.id)) {

		//Search the product by ID
		var i = 0;
		var product = null;
		for (i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				product = products[i];
				break;
			}
		}

		//product is null if there's not a product with the searched ID
		if (product !== null) {
			res.json(product);
		} else {
			res.status(404);
			res.send('Product not found');
		}

	} else {
		res.status(400);
		res.send('The Product id must be a number');
	}
});

/* POST a specific product */
router.post('/products', function (req, res, next) {
	//Content type must be json
	if (jsonValidator.isValidInput(req.headers['content-type'])) {
		var json = req.body;
		if (jsonValidator.isValidJson(json)) {
			products.push(json);
			res.json({ "STATUS": "200 OK" });
		} else {
			res.json({ "STATUS": "400 Bad Request" });
		}
	} else {
		res.statusCode(400);
		res.send('Request content type must be application/json and the request body must contain a valid json');
	}

});


/* DELETE all products and return with http code 200 (success) */
router.delete('/products', function (req, res, next) {
	products = [];
	res.status(200);
	res.send();
});

/* DELETE a specific product */
router.delete('/product/:id', function (req, res, next) {
	for (i = 0; i < products.length; i++) {
		if (products[i].id == req.params.id) {
			products.splice(i, 1);
			return res.json({ "STATUS": "200 OK" });
		}
	}
	return res.json({ "STATUS": "404 NOT FOUND" });
});


/*
 ***************************** 
	This section handles data properly stored in a no SQL database (mongodb)
 *****************************
*/


/* Load database initial data (the JSON document is created in dataConnection.js) */
router.post('/mongo/products/import', function (req, res, next) {
	try {
	dataConnection.importData('tech_products');
	res.send();
	} catch(error){
		console.log(error.message);
	}
});


/*GET: get all products from database*/
router.get('/mongo/products', function (req, res, next) {
	try {
		dataConnection.GetAllProducts(res);
	} catch (error) {
		res.status(400);
		res.send(error.message);
	}

});

/*GET: get all products from database*/
router.get('/mongo/products/:id', function (req, res, next) {
	try {
		dataConnection.GetProduct(res, parseInt(req.params.id));
	} catch (error) {
		res.status(400);
		res.send(error.message);
	}

});



module.exports = router;

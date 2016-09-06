var express = require('express');
var router = express.Router();


/* Products static file (just for basic operations)
The data will be properly stored in a database later.
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
]



/* GET products listing. */
router.get('/products/', function (req, res, next) {
  res.json(products);
});

/* GET a specific product */
router.get('/product/:id', function(req, res, next){
  var i = 0;
  var product = null;
  for (i = 0; i < products.length; i++){
    if (products[i].id == req.params.id){
      product = products[i];
      break;
    }
  }
  product !== null ? res.json(product) : res.json({"STATUS": "404 NOT FOUND"});
});

/*POST a specific product*/ 
router.post('/products', function(req, res, next){
  products.push(req.body);
  res.json({"STATUS": "200 OK"});
});

/*DELETE all products*/
router.delete('/products', function (req, res,next){
  products = [];
  res.json({"STATUS": "200 OK"});
});

/*DELETE a specific product*/
router.delete('/product/:id', function (req, res,next){
  for (i = 0; i < products.length; i++){
    if (products[i].id == req.params.id){
      products.splice(i,1);
      return res.json({"STATUS": "200 OK"});
    }
  }
  return res.json({"STATUS": "404 NOT FOUND"});
});

module.exports = router;

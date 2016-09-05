var express = require('express');
var router = express.Router();

var babies = [
  {
    "baby_id": "0",
    "baby_name": "Lucas"
  },
  {
    "baby_id": "1",
    "baby_name": "Guilherme"
  },
  {
    "baby_id": "2",
    "baby_name": "Miguel"
  },
]



/* GET users listing. */
router.get('/babies/', function (req, res, next) {
  res.json(babies);
});

module.exports = router;

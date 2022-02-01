const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bedrock Express Server' });
});

//
router.post('/', (req, res) => {
  res.status(200).json({message: "Looks good"})
})

module.exports = router;

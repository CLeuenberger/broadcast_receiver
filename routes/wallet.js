const express = require('express');
const _ = require('lodash');
const router = express.Router();
const parse = require('../utils/parseJson');

router
    .route('/')
    .post((req, res) => {
        res.status(200).json({respond: req.body})
    })
router
    .route('/noBody')
    .post((req, res) => {
        res.status(200)
    })
router
    .route('/400')
    .post((req, res) => {
        res.status(400).json({respond: req.body})
    })
router
    .route('/missingKey')
    .post((req, res) => {
        // let malformedPayload = malformTheJSON(req.body) //this funciton returns a malformed body for the response
        // res.status(200).json({respond: malformedPayload}) //return the malformed body
    })


// router.param("id", (req, res, next, id) =>{
//
// })

module.exports = router;

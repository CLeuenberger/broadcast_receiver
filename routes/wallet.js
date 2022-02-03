const express = require('express');
const _ = require('lodash');
const router = express.Router();
const sql = require('sqlite3').verbose();
const parse = require('../utils/parseJson');
const write = require('../utils/db_writer');
const appFile = require('../app');
write.create_table()

router
    .route('/')
    .post((req, res) => {
        write.write_table(req.body)
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

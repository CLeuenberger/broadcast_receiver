const express = require('express');
const _ = require('lodash');
const router = express.Router();
const sql = require('sqlite3').verbose();
const parse = require('../utils/parseJson');
const write = require('../utils/db_writer');
const appFile = require('../app');
const tyche = require('../utils/tyche_websocket')
write.create_table()

router
    .route('/')
    .post((req, res) => {
        res.status(200).json({respond: req.body})
        write.write_table(req.body)
        tyche.publish_to_tests(req.body)
    })
router
    .route('/noBody')
    .post((req, res) => {
        res.status(200)
    })
router
    .route('/400_userID_not_recognized')
    .post((req, res) => {
        res.status(400).json({"errors":[{"message":"user_id not recognized by Voyager",
                    "ethos_transaction_UUID":`${req.body.transactions[0].ethos_transaction_UUID}`}]})
    })
router
    .route('/400_userAddress_not_found')
    .post((req, res) => {
        res.status(400).json({"errors":[{"message":"user_address not found",
                    "ethos_transaction_UUID":`${req.body.transactions[0].ethos_transaction_UUID}`}]})
    })
router
    .route('/400_quantity_0')
    .post((req, res) => {
        res.status(400).json({"errors":[{"message":"quantity cannot be 0",
                    "ethos_transaction_UUID":`${req.body.transactions[0].ethos_transaction_UUID}`}]})
    })
router
    .route('/500')
    .post((req, res) => {
        res.status(500).json({"errors":[{"server_error": "Cannot handle request",
                    "ethos_transaction_UUID":`${req.body.transactions[0].ethos_transaction_UUID}`}]})
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

//
//
//
// router
//     .route("/:id")
//     .get((req, res) => {
//         res.send(`User ${req.params.id} Details`);
//     })
//     .post((req, res) => {
//         res.send(`User ${req.params.id} Added`);
//     })
//     .put((req, res) => {
//         res.send(`Updated  ${req.params.id} User `);
//     })
//     .delete((req, res) => {
//         res.send(`Deleted  ${req.params.id}  User `);
//     })
// router.param("id", (req, res, next, id) =>{
const express = require('express');
const router = express.Router();

/* GET users listing. */
router
    .route("/:id")
    .get((req, res) => {
        res.send(`User ${req.params.id} Details`);
      })
    .post((req, res) => {
        res.send(`User ${req.params.id} Added`);
        })
    .put((req, res) => {
        res.send(`Updated  ${req.params.id} User `);
      })
    .delete((req, res) => {
        res.send(`Deleted  ${req.params.id}  User `);
      })
router.param("id", (req, res, next, id) =>{

})

module.exports = router;

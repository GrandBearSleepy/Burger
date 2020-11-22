//Require express
const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

//GET route to display all burgers
router.get('/', function (req, res) {
    burger.all(function (data) {
        let hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});

//POST route to add a burger.
router.post('/api/burgers', function (req, res) {
    if (req.body.burger_name !== '') {
        burger.insert(
            ['burger_name', 'devoured'],
            [req.body.burger_name, req.body.devoured],
            function (result) {
                res.json({ id: result.insertId });
            });
    }

});

//PUT route to update burger devoured state.
router.put('/api/burgers/:id', function (req, res) {
    let condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//DELETE route to remove burger
router.delete('/api/burgers/:id', function (req, res) {
    let condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// Export routes for server.js to use.
module.exports = router;




const express = require('express');
const orders = require('../controllers/order.controller');

const router = express.Router();

router.route("/")
    .post(orders.addToOrder)
    .get(orders.findALL)
    .delete(orders.deleteAll);
    
router.route("/:id")
    .get(orders.findOne)
    .delete(orders.delete);
module.exports = router;

const express = require('express');
const carts = require('../controllers/cart.controller');

const router = express.Router();

router.route("/")
    .post(carts.addToCart)
    .get(carts.findALL)
    .delete(carts.deleteAll);
    
router.route("/:id")
    .get(carts.findOne)
    .delete(carts.delete);
module.exports = router;

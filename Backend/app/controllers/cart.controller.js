const CartService = require( '../services/Cart.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require("../api-error");

exports.addToCart = async(req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client); // Thay đổi MongoDB.client bằng client MongoDB của bạn
        const addItem = await cartService.addToCart(req.body);
        return res.send(addItem);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while adding to the cart'));
    }
};
exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const cartService = new CartService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await cartService.findByName(name);
        } else {
            documents = await cartService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error rtrieving contact with id=${req.params.id}`)
        );
    };
};

exports.delete = async (req,res, next) => {
  
    try{
        const cartService = new CartService(MongoDB.client);
       
        const document = await cartService.delete(req.params.id);
       
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({
            message: " deleted succesfully"
        });
    }catch(err){
        return next(new ApiError(500, `Could not delete with id=${req.params.id}`));
    }
};
exports.deleteAll = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const result = await cartService.deleteAll();

        if (!result) {
            return next(new ApiError(404, "No items found in the cart"));
        }

        return res.send({
            message: "All items deleted successfully",
        });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while deleting all items"));
    }
};


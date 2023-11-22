const OrderService = require( '../services/order.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require("../api-error");

// Phương thức thêm đơn hàng mới
exports.addToOrder = async(req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client); // Thay đổi MongoDB.client bằng client MongoDB của bạn
        const addItem = await orderService.addToOrder(req.body);
        return res.send(addItem);
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while adding to the cart'));
    }
};
// Phương thức lấy danh sách đơn hàng
exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const orderService = new OrderService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await orderService.findByName(name);
        } else {
            documents = await orderService.find({});
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
        const orderService = new OrderService(MongoDB.client);
        const document = await orderService.findById(req.params.id);
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
        const orderService = new OrderService(MongoDB.client);
       
        const document = await orderService.delete(req.params.id);
       
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
        const orderService = new OrderService(MongoDB.client);
        const result = await orderService.deleteAll();

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

const ProductService = require('../services/product.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "name can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.create(req.body);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occuerred while creating the contact")
        );
    }
};

exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await productService.findByName(name);
        } else {
            documents = await productService.find({});
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
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error rtrieving contact with id=${req.params.id}`)
        );
    };
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to updata can not be empty"));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({ message: "contact was updated successfully" });
    }
    catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({ message: "contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `could not delete contact with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return (new ApiError(500, "An error occurred while removing all contacts"))
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findFavorite();
        return res.send(documents);

    } catch (error) {
        return next(new ApiError(500, "An error occured while retrieving favorite contacts"));
    }
};

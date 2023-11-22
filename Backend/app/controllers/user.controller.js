const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "name can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByEmail(req.body.email);
        if (document) {
            return res.send({message: "email da ton tai"});
        }
        const documents = await userService.create(req.body);
        return res.send({message: "user tạo thành công"});


    } catch (error) {
        return next(
            new ApiError(500, "An error occuerred while creating the contact")
        );
    }
};
exports.login = async (req, res, next) => {
    
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByEmail(req.body.email);
        if (!document) {
            return res.send({message: "tài khoản không tồn tại"});
        }
        const pass = document.password == req.body.password
        if(!pass)
        {
            return res.send({message: "mat khau khong dung"});
        }
            return res.send({message: "dang nhap thanh cong"});

    } catch (error) {
        return next(
            new ApiError(500, "An error occuerred while creating the contact")
        );
    }
};
exports.logout = async (req, res, next) => {
    try {
        // Xóa token khỏi cookie hoặc lưu trữ khác
        res.clearCookie('access_token');

        return res.send({ success: true, message: 'Đăng xuất thành công' });
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while logging out'));
    }}
exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
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
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return (new ApiError(500, "An error occurred while removing all contacts"))
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.findFavorite();
        return res.send(documents);

    } catch (error) {
        return next(new ApiError(500, "An error occured while retrieving favorite contacts"));
    }
};


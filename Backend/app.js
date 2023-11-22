const express = require("express");
const cors = require("cors");

const usersRouter = require("./app/routes/user.route.js");
const productRouter = require("./app/routes/product.route.js");
const cartRouter = require("./app/routes/cart.route.js");
const orderRouter = require("./app/routes/order.route.js");


const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((Error, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(Error.statusCode || 500).json({
        message: Error.message || "Internal Server Error",
    });
});

module.exports = app;

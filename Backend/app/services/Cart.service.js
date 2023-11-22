const { ObjectId } = require("mongodb");
class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCartData(payload) {
        const cart = {
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,
        };

        // Remove undefined fields
        Object.keys(cart).forEach(
            (key) => { if (cart[key] === undefined) { delete cart[key] } }
        );
        return cart;
    }
    async addToCart(payload) {
        const cartItem = this.extractCartData(payload);
        const result = await this.Cart.insertOne(cartItem);
        return cartItem, result;
        
    }
    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async delete(id){
        console.log('goi ham delete conver  ' + id);
       const result = await this.Cart.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id): null,
       });
       console.log("resu " +result);
       return result;
    }
    async deleteAll() {
        try {
            const result = await this.Cart.deleteMany({});
            console.log("Deleted all items from the cart:", result.deletedCount);
            return result;
        } catch (error) {
            console.error("Error deleting all items:", error);
            throw error;
        }
    }
}

module.exports = CartService;
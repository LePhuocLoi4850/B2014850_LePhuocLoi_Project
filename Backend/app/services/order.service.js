const { ObjectId } = require("mongodb");
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }
    extractOrderData(payload) {
        const order = {
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,

        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => { if (order[key] === undefined) { delete order[key] } }
        );
        return order;
    }
    async addToOrder(payload) {
        const orderItem = this.extractOrderData(payload);
        const result = await this.Order.insertOne(orderItem);
        return orderItem, result;
        
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async delete(id){
        console.log('goi ham delete conver  ' + id);
       const result = await this.Order.findOneAndDelete({
        _id: ObjectId.isValid(id) ? new ObjectId(id): null,
       });
       console.log("resu " +result);
       return result;
    }
    async deleteAll() {
        try {
            const result = await this.Order.deleteMany({});
            console.log("Deleted all items from the cart:", result.deletedCount);
            return result;
        } catch (error) {
            console.error("Error deleting all items:", error);
            throw error;
        }
    }

}

module.exports = OrderService;

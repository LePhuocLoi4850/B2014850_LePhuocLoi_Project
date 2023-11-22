const { ObjectId } = require("mongodb");
class UserSevice {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
        };

        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => { if (user[key] === undefined) { delete user[key] } }
        );
        return user;
    }
    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { favorite: user.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.User.findOne({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async findByEmail(email) {
        return await this.User.findOne({
            email: { $regex: new RegExp(email), $options: "i" },
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    async login(email, password) {
        return await this.User.findOne({ email: email, password: password });
    }
    
    async logout() {
        // Không cần tìm thông tin người dùng khi đăng xuất
        return { success: true, message: 'Đăng xuất thành công' };
    }


}
module.exports = UserSevice;
import createApiClient from "./api.service";
class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async addToCart(data) {
        return (await this.api.post("/", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
}
export default new CartService();
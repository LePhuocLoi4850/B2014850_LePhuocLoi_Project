import createApiClient from "./api.service";
class Orderervice {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async addToOrder(data) {
        return (await this.api.post("/", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

}
export default new Orderervice();
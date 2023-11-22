import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async login(data){
        return (await this.api.post("/login", data)).data;
    }
    async logout() {
        try {
            // Gọi API để thực hiện đăng xuất
            return (await this.api.post("/logout")).data;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

}
export default new UserService();
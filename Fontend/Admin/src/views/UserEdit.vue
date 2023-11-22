<template>
    <div v-if="user" class="page">
        <h4 style="text-align: center; margin-top:20px">hiệu chỉnh</h4>
        <UserForm :user="user" @submit:user="updateUser" @delete:user="deleteUser" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
export default {
    components: {
        UserForm,
    },
    props: {
        id: {type: String, required: true},
    },
    data() {
        return {
            user: null,
            message: "",

        };
    },
    methods: {
        async getUser(id) {
            try {
                this.user = await UserService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateUser(data) {
            try {
                await UserService.update(this.user._id, data);
                this.$router.push("/")
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await UserService.delete(this.user._id);
                    this.$router.push("/")
                } catch (error) {
                    console.log(error);
                }
            }
        },

    },
    created() {
        this.getUser(this.id);
        this.message = "";
    },
}

</script>
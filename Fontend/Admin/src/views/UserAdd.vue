<template>
    <div v-if="user" class="page">
        <h4 style="text-align: center; margin-top:20px">Thêm User</h4>
        <UserForm  :user="user" @submit:user="createUser" />
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
    data() {
        return {
            user: {},
            message: "",
            
        };
    },
    methods: {
       
        async createUser(data) {
            try {
                const user = await UserService.create(data)
                    this.message = user.message;
                    // this.$router.push("/")
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.message = "";
    },
};
</script>
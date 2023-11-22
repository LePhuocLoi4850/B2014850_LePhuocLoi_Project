<template>
    <div class="singin">
        <div>
            <img style="width: 900px; height:600px"
                src="https://tse1.mm.bing.net/th?id=OIP.7N-A794ZJbWirNyLEEzfnAHaEo&pid=Api&P=0&h=220" alt="">
        </div>
        <div v-if="contact" class="container">
            <h4 style="text-align: center; margin:22px 0">Đăng Nhập</h4>
            <ContactFormLogin @submit="LoginUser" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
import ContactFormLogin from "@/components/ContactFormLogin.vue";
import ContactService from "@/services/contact.service";
export default {
    components: {
        ContactFormLogin,
    },
    data() {
        return {
            contact:{},
            message: "",
        };
    },
    methods: {

        async LoginUser(contactLocal) {
            // console.log(1);
            try {
                const user = await ContactService.login(contactLocal.email, contactLocal.password);

                if (user) {
                    // Đăng nhập thành công
                    // Chuyển hướng đến trang chủ
                    this.$router.push({ name: "contactbook" });
                } else {
                    // Đăng nhập thất bại
                    // Hiển thị thông báo lỗi
                    this.message = "Đăng nhập thất bại";
                }
            } catch (error) {
                // Hiển thị thông báo lỗi
                this.message = error.message;
            }
        }

    },

};
</script>
<style scoped>
.singin {
    display: flex;
    margin: 0px 50px;
}

.container {
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(110, 118, 124, 0.1), 0 2px 6px 2px rgba(164, 176, 185, 0.3);
}
</style> 
<template>
    <Form @submit="SubmitUser" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="contact.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input type="password" class="form-control" id="password" v-model="contact.password">

        </div>
        <div class="form-group d-grid gap-2 col-8 mx-auto">
            <button class="btn btn-primary singin">Đăng Nhập</button>
        </div>
        <!-- <button v-show="isShow" class=" btn btn-danger "><router-link class="home" to="/">trang chủ</router-link></button> -->

    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    data() {
        const contactFormSchema = yup.object().shape({

            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required()

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // contactLocal để liên kết với các input trên form
            contact: { email: "", password: "" },
            contactFormSchema,
            // isShow : false,
        };
    },
    methods: {
        async SubmitUser() {
            const user = await contactService.loginUser(this.contactLocal.email, this.contactLocal.password);

            if (user) {
                // Đăng nhập thành công
                // Chuyển hướng đến trang chủ
                this.$router.push({ name: "contactbook" });
            } else {
                // Đăng nhập thất bại
                // Hiển thị thông báo lỗi
                this.error(error.message);
            }
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";

.singin {
    width: 200px;
}
</style>
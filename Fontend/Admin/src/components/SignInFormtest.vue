
<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <Form  @submit="submitUser" :validation-schema="userFormSchema" class="signin-form">
                    <p class="title">Sign in</p>
                    <div class="input-field">
                        <i class="fa fa-user"></i>
                        <input name="email" type="text" placeholder="Email"  v-model="userLocal.email"/>
                    </div>
                    <div class="input-field">
                        <i class="fa fa-lock"></i>
                        <input name="password" type="password" placeholder="Password"  v-model="userLocal.password"/>
                    </div>
                    <input type="submit" class="btn solid" value="Login"/>
                    <p>Bạn chưa có tài khoản?<input type="submit" class="btn signin-solid" value="Sign Up"/></p>
                    <div class="social-media">
                        <a href="" class="social-icon icon">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-tiktok"></i>
                        </a>
                    </div>
                </Form>
            </div>
        </div>
    </div>
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
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("Hãy nhập email")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Hãy nhập mật khẩu")
                .min(8,"Mật khẩu phải có ít nhất 8 ký tự")
                .max(20, "Mật khẩu có tối đa 50 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userLocal để liên kết với các input trên form
            userLocal: this.user,
            userFormSchema,
            // isShow : false,
        };
    },
    methods: {
        submitUser() {
            this.$emit("submit:user", this.userLocal);
        },
    },
};
</script>
<style>
@import "@/assets/style.css";
</style>
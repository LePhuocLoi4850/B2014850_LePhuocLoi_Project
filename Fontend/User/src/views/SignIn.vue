<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    emits: ["submit:user", "delete:user"],
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
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
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
        goToSignup() {
            this.$router.push({ name: "user.signup" });
        },
    }
}
</script>
<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form @submit="submitUser" :validation-schema="userFormSchema" class="signin-form">
                    <p class="title">Sign in</p>
                    <div class="input-field">
                        <i class="fa fa-user"></i>
                        <input name="email" type="text" placeholder="Username" />
                    </div>
                    <div class="input-field">
                        <i class="fa fa-lock"></i>
                        <input name="password" type="password" placeholder="Password" />
                    </div>
                    <input type="submit" class="btn solid btn-hover" value="Login" />
                    <p>Bạn chưa có tài khoản?
                        <router-link :to="{
                            name: 'user.signup',
                        }">
                            <input type="submit" @click="goToSignup" class="btn signin-solid btn-signup-hover"
                                value="Sign Up" />
                        </router-link>
                    </p>
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
                </form>
            </div>
        </div>
    </div>
</template>
<style>
@import "@/assets/style.css";

.btn-hover:hover {
    color: black;
}

.btn-signup-hover:hover {
    color: #C58021;
}
</style>
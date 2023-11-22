<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <input type="submit" class="btn-submit btn-hover" value="Đăng nhập" />
        </div>
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
<style scoped>
@import "@/assets/form.css";

.form-group {
    width: 50%;
}

label {
    font-weight: bold;
}
.btn-submit{
    width:120px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: #C58021;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    margin: 10px 0 0;
    transition: all 0.5s;
}
.btn-submit:hover{
    color: black;
}
.btn-submit.delete{
    margin-left: 10px;
    background-color: red;

}
.form-group{
    margin: 0;
}
</style>
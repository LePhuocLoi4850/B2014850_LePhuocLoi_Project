<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="userLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
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
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="userLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="userLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <input type="submit" class="btn-submit btn-hover" value="Lưu" />
            <input v-if="userLocal._id" type="button" class="btn-submit delete btn-hover" @click="deleteUser" value="Xóa"  />
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
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
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
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .required("Hãy nhập số điện thoại")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
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
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
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
    width:80px;
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
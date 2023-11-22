<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
        <div class="form-group">
            <label for="name">Name</label>
            <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="detail">Detail</label>
            <textarea style="resize: none;" name="detail" type="note" class="form-control" v-model="productLocal.detail" />
            <ErrorMessage name="detail" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Price</label>
            <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Quantity</label>  
            <Field name="quantity" type="number" class="form-control" v-model="productLocal.quantity" />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="note">Note</label>
            <Field name="note" type="text" class="form-control" v-model="productLocal.note" />
            <ErrorMessage name="note" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="image">Image</label>
            <Field name="image" type="text" class="form-control" v-model="productLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <!-- <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="productLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div> -->
        <div class="form-group">
            <input type="submit" class="btn-submit btn-hover" value="Lưu" />
            <input v-if="productLocal._id" type="button" class="btn-submit delete btn-hover" @click="deleteProduct" value="Xóa"  />
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
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            detail: yup
                .string()
                // .required("Phải có ít nhất 10 ký tự.")
                .min(10, "Tên phải ít nhất 2 ký tự.")
                .max(500, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            price: yup
                .string()
                .min(6, "tối thiểu 100.000đ")
                .max(6, "tối đa 999.999đ")
                .matches(
                    /[0-9]+(\.[0-9]+)?/g,
                    "Số tiền không hợp lệ."
                ),

        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // productLocal để liên kết với các input trên form
            productLocal: this.product,
            productFormSchema,
            // isShow : false,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
.form-group {
    width: 50%;
    margin: 0;
}
label{
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
</style>
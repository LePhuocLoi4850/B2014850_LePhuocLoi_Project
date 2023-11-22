<template>
    <div v-if="product" class="page">
        <h4 style="text-align: center; margin-top:20px">hiệu chỉnh</h4>
        <DishForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import DishForm from "@/components/DishForm.vue";
import ProductService from "@/services/product.service";
export default {
    components: {
        DishForm,
    },
    props: {
        id: {type: String, required: true},
    },
    data() {
        return {
            product: null,
            message: "",

        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
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
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.$router.push("admindish")
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push("admindish")
                } catch (error) {
                    console.log(error);
                }
            }
        },

    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
}

</script>
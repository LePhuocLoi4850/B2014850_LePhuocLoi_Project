    <template>
    <div v-if="product" class="page">
        <h4 style="text-align: center; margin-top:20px">Thêm Món Ăn</h4>
        <DishForm  :product="product" @submit:product="createProduct" />
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
    data() {
        return {
            product: {},
            message: "",
            
        };
    },
    methods: {
       
        async createProduct(data) {
            try {
                await ProductService.create(data);
                this.message = "Liên hệ được tạo thành công.";
                this.$router.push("admindish")
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
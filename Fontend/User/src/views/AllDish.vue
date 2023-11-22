<template>
    <div>
        
        <div class="mt-3 col-md-6">
            <ContactList1 v-if="filteredProductCount > 0" :product="filteredProduct" />
        </div>
       <Footer/>
    </div>
</template>
<script>
import ContactList1 from "@/components/ContactList1.vue";
import ProductService from "@/services/contact.service";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        ContactList1,
        Footer,
    },
    data() {
        return {
            product: [],
           
        };
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        productStrings() {
            return this.product.map((product) => {
                const { name, email, address, phone } = product;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredProduct() {
            if (!this.searchText) return this.product;
            return this.product.filter((_contact, index) =>
                this.productString[index].includes(this.searchText)
            );
        },
        activeProduct() {
            if (this.activeIndex < 0) return null;
            return this.filteredProduct[this.activeIndex];
        },
        filteredProductCount() {
            return this.filteredProduct.length;
        },
    },
    methods: {
        async retrieveProduct() {
            try {
                this.product = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProduct();
            this.activeIndex = -1;
        },
        async removeAllProducts() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await ProductService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddProduct() {
            this.$router.push({ name: "contact.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
</script>
<style scoped>
.col-md-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 100%;
}

#banner {
    width: 100%;
    background-image: url("@/assets/img/banner.png");
    height: 400px;
    /* margin-top: 40px; */
    display: flex;
    padding: 0px 133px;
    position: relative;
}

#banner .box-left {
    width: 50%;
}

#banner .box-left h2 {
    font-size: 48px;
    margin-top: 75px;
    color: #fff;
    font-family: 'Times New Roman', Times, serif;
}

#banner .box-left p {
    color: #D0D0D0;
    font-family: "Varela_Round variant0", Tofu;

}

#banner .box-left button {
    width: 191px;
    height: 40px;
    margin-top: 41px;
    background: #5e5555;
    border: none;
    outline: none;
    color: #fff;
    font-weight: bold;
    border-radius: 20px;
    transition: 0.4s;
}

#banner .box-left button:hover {
    background: orange;
}
</style>
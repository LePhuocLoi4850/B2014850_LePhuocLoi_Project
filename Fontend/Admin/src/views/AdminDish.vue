<template>
    <AdminListDish :products="filteredProducts" />
</template>
<script>
import AdminListDish from "@/components/AdminListDish.vue"
import ProductService from "@/services/product.service";

export default {
    components: {
        AdminListDish,
    },
    data() {
        return {
            products: [],
        };
    },
    computed: {
       filteredProducts() {
            if (!this.searchText) return this.products;
            return this.products.filter((_contact, index) =>
                this.productStrings[index].includes(this.searchText)
            );
        },
    },
    methods: {
        
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshListProducts() {
            this.retrieveProducts();
        },
    },
    mounted() {
        this.refreshListProducts();
    },
};
</script>

<style scoped>
.sidebar {
    margin-bottom: 10px;
    padding: 0;
}

.nav-link-sign-out {
    text-decoration: none;
    color: #fff
}

.nav-link {
    color: #000000;
}

.nav-link:hover {
    background-color: #f2ebeb
}

.icon_delete {
    color: red;
}</style>
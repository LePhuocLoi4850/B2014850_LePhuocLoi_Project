<script>
export default {
    computed:{
        sortedProducts() {
            // Sắp xếp sản phẩm theo giá tiền giảm dần
            return this.product.slice().sort((a, b) => b.price - a.price);
        },
    },
    props: {
        product: { type: Array },
    },
    methods:

    {
        gotoproductdish(id) {
            this.$router.push({ name: 'contact.name', params: { id: id } })
        },
        formatCurrency(value) {
        // Sử dụng Intl.NumberFormat để định dạng tiền tệ
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        // Sử dụng .replace để thêm dấu chấm sau mỗi 3 chữ số
        return formatter.format(value).replace(/,/g, '.');
    },
        
    },
}
</script>
<template>
    <div class="container px-4 py-5" id="custom-cards">
        <h2 class="pb-2 border-bottom">Bán Chạy Nhất</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5" style="display: flex;">
            <div class="col-2" v-for="(product) in product.slice(0, 3)" :key="product._id"
                style="padding: 10px;min-height: 300px;">
                <div style="height:80%" @click="gotoproductdish(product._id)">
                    <img :src="product.image"
                        class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" alt=""
                        style="border-radius:20px; width: 100%;height: 100%;">
                    <div style="text-align:center;color: rgb(197, 128, 33);">
                        <br>
                        <h4>{{ product.name }}</h4>
                        <h5>{{ formatCurrency(product.price) }}</h5>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="pb-2 border-bottom">Mới nhất</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5" style="display: flex;">
            <div class="col-2" v-for="(product) in product.slice(-3).reverse()" :key="product._id"
                style="padding: 10px;min-height: 300px; margin-bottom: 20px;">
                <div style="height:80%" @click="gotoproductdish(product._id)">
                    <img :src="product.image"
                        class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" alt=""
                        style="border-radius:20px; width: 100%;height: 100%;">
                    <div style="text-align:center;color: rgb(197, 128, 33);">
                        <br>
                        <h4>{{ product.name }}</h4>
                        <h5>{{ formatCurrency(product.price) }}</h5>
                    </div>
                </div>
            </div>
        </div>
        <h2 class="pb-2 border-bottom">VIP</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5" style="display: flex;">
            <div class="col-2" v-for="(product) in sortedProducts.slice(0, 3)" :key="product._id"
                style="padding: 10px;min-height: 300px; margin-bottom: 20px;">
                <div style="height:80%" @click="gotoproductdish(product._id)">
                    <img :src="product.image"
                        class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" alt=""
                        style="border-radius:20px; width: 100%;height: 100%;">
                    <div style="text-align:center;color: rgb(197, 128, 33);">
                        <br>
                        <h4>{{ product.name }}</h4>
                        <h5>{{ formatCurrency(product.price) }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-cover {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.p-p {
    padding-bottom: 0px;
    padding: 3rem;
}
.pt-5, .py-5 {
    padding-top: 1rem!important;
}
h2{
    font-family: revert;
    font-size: xxx-large;
    color: chocolate;
}
h4{
    font-family: math;
}
h5{
    font-family: fantasy;
    color: chocolate;
}
.pb-5, .py-5 {
    padding-bottom: 0rem!important;
}
</style>
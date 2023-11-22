<script>
export default {
    props: {
        product: { type: Array},
    },
    methods:
        {
            gotoproductdish(id){
                this.$router.push({name: 'contact.name', params: {id: id}})
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
        }
};
</script>
<template>
    <div class="container px-4 py-5" id="custom-cards">
        <h2 class="pb-2 border-bottom">Sản phẩm của chúng tôi</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5" style="display: flex;">
            <div class="col-2" v-for="(product) in product" :key="product._id" style="padding: 10px;min-height: 300px; margin-bottom: 20px">
                <div style="height:80%" @click="gotoproductdish(product._id)">
                    <img :src="product.image"
                        class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" alt=""
                        style="border-radius:20px; width: 100%;height: 100%;;">
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
h2{
    font-family: math;
    font-weight: bold;
    color: chocolate;
    font-size: 40px;
    text-align: center;
}
.pt-5, .py-5 {
    padding-top: 1rem!important;
}
.pb-5, .py-5 {
    padding-bottom: 0rem!important;
}
</style>
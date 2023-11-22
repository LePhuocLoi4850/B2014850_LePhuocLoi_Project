<script>
import ContactService from "@/services/contact.service";
import CartService from "@/services/cart.service";
export default {
    props: {
        id: { type: String },
    },
    data() {
        return {
            product: null,
            quantity: 1, // Giá trị mặc định
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.product = await ContactService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
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
        formatCurrency(value) {
        // Sử dụng Intl.NumberFormat để định dạng tiền tệ
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        // Sử dụng .replace để thêm dấu chấm sau mỗi 3 chữ số
        return formatter.format(value).replace(/,/g, '.');
    },
        increaseQuantity() {
            this.quantity += 1;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            }
        },
        addToCart() {
        const cartItem = {
            name: this.product.name,
            price: this.product.price,
            quantity: this.quantity,
            image: this.product.image,
        };

        // Gọi phương thức từ CartService để thêm sản phẩm vào giỏ hàng
        CartService.addToCart(cartItem)
            .then(() => {
                // Thực hiện các hành động sau khi thêm vào giỏ hàng thành công, ví dụ: hiển thị thông báo
                alert("Sản phẩm đã được thêm vào giỏ hàng!");
            })
            .catch((error) => {
                alert("Lỗi khi thêm vào giỏ hàng:", error);
            });
    },
},

    decreaseQuantity() {
        this.quantity -= 1;
        if (this.quantity < 1) {
            this.quantity = 1;
        }
    },
    increaseQuantity() {
        this.quantity += 1;
    },
    created() {
        this.getContact(this.id);
    },


}
</script>
<template>
    <div class="container py-4">
        <div class="row align-items-md-stretch" v-if="product">
            <div class="col-md-6">
                <img :src="product.image" style="width: 100%;height: 100%;border-radius: 10px;" alt="">
            </div>
            <div class="col-md-6">
                <div class="h-100 p-p bg-light rounded-3">
                    <h2 style="color:rgb(197, 128, 33); ;">{{ product.name }}</h2>
                    <h5>Thành phần</h5>
                    <p>{{ product.detail }}</p>
                    <div style="display: flex;">
                        <p style="margin-right: 20px;"><i class="fa-regular fa-clock"></i> 20 phút</p>
                        <p> <i class="fa-solid fa-compass"></i> 1km</p>
                    </div>
                    <div style="display: flex;">
                        <p style="margin-right: 20px;">Giờ mở cửa</p>
                        <p>Hôm nay 10:00-22:00 </p>
                    </div>
                    <div style="display: flex;margin: auto;">
                        <p style="margin-right: 10px; margin-top: 16px;">còn hàng</p>
                        <p style="margin-top: 16px;"><i class="fa-solid fa-check"></i></p>
                    </div>
                    <h4 style="color: red">{{ formatCurrency(product.price) }}</h4>
                    <div>
                        <div class="up_down_number" style="display: flex;">
                            <a role="button" class="sl" @click="decreaseQuantity">
                                <img src="https://food.grab.com/static/images/icons/icon-minus-bordered.svg" alt="">
                            </a>
                            <input v-model="quantity" type="text" name="amout" id="amout" class="quantiny_dish" >
                            <a role="button" class="sl" @click="increaseQuantity">
                                <img src="https://food.grab.com/static/images/icons/icon-plus-bordered.svg" alt="">
                            </a>
                        </div>
                        <button class="btn btn-primary btn-lg" type="button" style="width: 100%;" @click="addToCart">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-p {
    padding: 0px 40px 40px 40px;
}

.number {
    justify-content: center;
    text-align: center;
    width: 20px;
    margin: auto;
}

.up_down_number {
    justify-content: center;
    height: 40px;
    width: 130px;
    margin-bottom: 20px;
}

.quantiny_dish {
    width: 50px;
    border: 0;
    text-align: center;
    margin: 5px;
}

.sl {
    display: flex;
}</style>

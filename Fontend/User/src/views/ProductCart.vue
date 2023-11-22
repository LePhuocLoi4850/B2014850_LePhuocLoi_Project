<template>
    <div class="container">
        <div>
            <h2 class="pb-2 border-bottom">Giỏ hàng</h2>
            <div v-if="cart.length === 0">
            <!-- Hiển thị thông báo khi giỏ hàng trống -->
            <p>Giỏ hàng của bạn đang trống.</p>
        </div>
            <div class="table-responsive" v-else>
                <table class="table table-striped table-sm">
                    <tbody>
                        <tr v-for="cart in cart" :key="cart._id"
                            style="display: flex;background-color: #EEF0F2; margin-bottom:20px;border-radius: 10px;">
                            <td style="width: 200px;">
                                <img :src="cart.image" alt="Product Image"
                                    style="width: 200px;height: 135px;margin-left: 3px;border-radius:10px">
                            </td>
                            <td style="width: 400px; display: flex; align-items: center; justify-content: center;">
                                <h4 style="text-align: center;">{{ cart.name }}</h4>
                            </td>
                            <td style="width: 200px; display: flex; align-items: center; justify-content: center;">
                                <div class="up_down_number" style="display: flex;">
                                    <a role="button" class="sl" @click="decreaseQuantity">
                                        <img src="https://food.grab.com/static/images/icons/icon-minus-bordered.svg" alt="">
                                    </a>
                                    <input v-model="quantity" type="text" name="amout" id="amout" class="quantiny_dish">
                                    <a role="button" class="sl" @click="increaseQuantity">
                                        <img src="https://food.grab.com/static/images/icons/icon-plus-bordered.svg" alt="">
                                    </a>
                                </div>
                            </td>
                            <td style="width: 200px;display: flex; align-items: center; justify-content: center;">
                                <h4>{{ formatCurrency(cart.price) }}</h4>
                            </td>
                            <td style="width: 100px;display: flex; align-items: center; justify-content: center;">
                                <div class="icon_delete" @click="deleteCartItem(cart._id)">
                                    <i class="fa-regular fa-trash-can" style="color: red;font-size: 20px;"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end mb-3">
            </div>
            <div class="d-flex justify-content-end mb-3 order_button" >
                <h3 style="margin-right: 20px;">Tổng tiền: {{ formatCurrency(totalAmount) }}</h3>
                <button class="btn btn-primary btn-lg" type="button" @click="addToOrder">Đặt hàng</button>
            </div>
            </div>
            
        </div>


    </div>
</template>
    
<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";

export default {
    // props: {
    //     id: { type: String },
    // },
    data() {
        return {
            cart: [],
            quantity: 1,
            totalAmount: 0,
        };
    },
    created() {
        this.getCart();
    },
    methods: {
        increaseQuantity() {
            this.quantity += 1;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1;
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
        async getCart() {
            try {
                this.cart = await CartService.getAll();
                this.calculateTotalAmount();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCartItem(id) {
            try {
                await CartService.delete(id);
                this.getCart();
                alert("Sản phẩm đã được xóa khỏi giỏ hàng");
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        },
        calculateTotalAmount() {
            this.totalAmount = this.cart.reduce((total, cart) => {
                return total + cart.price * cart.quantity;
            }, 0);
        },
        async addToOrder() {
            try {
                // Chạy vòng lặp qua từng sản phẩm trong giỏ hàng và thêm vào đơn hàng
                for (const cart of this.cart) {
                    const orderItem = {
                        name: cart.name,
                        price: cart.price,
                        quantity: cart.quantity,
                        image: cart.image,
                    };

                    // Gọi phương thức từ OrderService để thêm sản phẩm vào đơn hàng
                    await OrderService.addToOrder(orderItem);
                }

                alert("Sản phẩm đã được thêm vào đơn hàng!");
                await this.removeAllCart();
                this.$router.push("/order");
                // Thực hiện các hành động sau khi thêm vào đơn hàng thành công, ví dụ: hiển thị thông báo

            } catch (error) {
                // Xử lý lỗi khi thêm vào đơn hàng
                console.error("Lỗi khi thêm vào đơn hàng:", error);
                alert("Lỗi khi thêm vào đơn hàng. Vui lòng thử lại sau.");
            }
        },
        async removeAllCart() {
            try {
                await CartService.deleteAll();
                this.cart = []; // Cập nhật giỏ hàng thành mảng rỗng
                this.totalAmount = 0; // Đặt tổng giá trị thành 0
            } catch (error) {
                console.error("Error removing all items from cart:", error);
            }
        },

    },

};
</script>
    
<style>
.up_down_number {
    justify-content: center;
    height: 40px;
    width: 130px;
}

.quantiny_dish {
    width: 40px;
    height: 40px;
    border: 1px solid #333;
    text-align: center;
    border-radius: 10px;
}

.sl {
    display: flex;
    border-radius: 10px;
}

h2 {
    font-family: math;
    font-weight: bold;
    color: chocolate;
    font-size: 40px;
    text-align: center;
}

.btn-lg {
    width: 270px;
}
.order_button{
    display: flex; align-items: center; justify-content: center;
}
</style>
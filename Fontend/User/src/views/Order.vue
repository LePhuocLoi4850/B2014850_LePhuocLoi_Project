<script>
import OrderService from "@/services/order.service";

export default {
    data() {
        return {
            orders: [],
            totalAmount: 0,
            ordersCollapsed: false,
        }
    },
    created() {
        this.getOrders(); // Gọi phương thức getOrders khi component được tạo
    },
    methods: {
        formatCurrency(value) {
            // Sử dụng Intl.NumberFormat để định dạng tiền tệ
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });

            // Sử dụng .replace để thêm dấu chấm sau mỗi 3 chữ số
            return formatter.format(value).replace(/,/g, '.');
        },
        async getOrders() {
            try {
                this.orders = await OrderService.getAll();
                this.orders.forEach(order => {
                    // Thêm thuộc tính `orderDate` chứa ngày giờ đặt hàng
                    order.orderDate = new Date(order.createdAt).toLocaleString();
                });
                this.calculateTotalAmount();
            } catch (error) {
                console.log(error);
            }
        },
        calculateTotalAmount() {
            this.totalAmount = this.orders.reduce((total, order) => {
                return total + order.price * order.quantity;
            }, 0);
        },
        async removeAllCart() {
            try {
                await OrderService.deleteAll();
                this.orders = []; // Cập nhật giỏ hàng thành mảng rỗng
                this.totalAmount = 0; // Đặt tổng giá trị thành 0
            } catch (error) {
                console.error("Error removing all items from cart:", error);
            }
        },
        toggleOrders() {
            this.ordersCollapsed = !this.ordersCollapsed;
        },
    }
}
</script>

<template>
    <div class="container">
        <div v-if="orders.length == 0">
            <p>Không có đơn hàng.</p>
        </div>
        <div v-else>
            <div class="container main">
                <div style="display:flex; justify-content:space-between">
                    <p style="    font-size: 24px;font-family: math;font-weight: bold;">Đơn Hàng</p>
                    <button @click="toggleOrders" style="width: 100px;color: chocolate;height: 30px;">
                        {{ ordersCollapsed ? 'Thu gọn' : 'Chi tiết' }}
                    </button>
                </div>
                <hr>
                <div v-if="ordersCollapsed">
                    <div v-for="order in orders" :key="order._id" style="display:flex; height:110px; margin-bottom: 20px;">
                        <div style="height:110px; width: 200px;">
                            <img :src="order.image" alt="Ảnh" style="height:110px;width: 157px;">
                            <hr style="width: 870px;" />
                        </div>
                        <div style="width: 600px;">
                            <p>{{ order.name }}</p>
                            <p>{{ order.quantity }}x</p>
                        </div>
                        <div style="text-align:center; font-size: 25px; color: chocolate; font-family: inherit;">
                            {{ formatCurrency(order.price * order.quantity) }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="container total">
                <div style="display: flex;" class="justify-content-end">
                    <p style="margin-right: 10px;">Tổng thành tiền:</p>
                    <p class="price">{{ formatCurrency(totalAmount) }}</p>
                </div>
                <div class="d-flex justify-content-end " style="padding-bottom: 20px;">
                    <button class="button-disabled" style="margin-right: 10px;background-color: rgb(158, 158, 158);">Đã Nhận Hàng</button>
                    <button style="background-color: red" @click="removeAllCart">Hủy Đơn Hàng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container.main {
    max-width: 896px;
    padding: 10px;
    background-color: #F2F2F2;
    border-radius: 0px 0px 5px 5px;
}

.container.total {
    width: 896px;
    height: 100px;
    padding-top: 10px;
    margin-top: 3px;
    background-color: #F2F2F2;
    border-radius: 5px 5px 0px 0px;
}

.price {
    font-size: 25px;
    color: chocolate;
    font-family: inherit;
}

button {
    width: 130px;
    font-family: arial;
    color: white;
    border-radius: 3px;
    border: 1px solid #929090;
}

</style>
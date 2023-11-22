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
    <div class="container-fluid">
        <div class="row">
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 class="h2">Danh Sách Chi Tiết Đơn Hàng</h1>
                </div>
                <div v-if="orders.length ==0" class="alert alert-info" role="alert">
                    Không có đơn hàng.
                </div>
                <div v-else class="table-responsive">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">name</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order._id">
                                    <td>{{ order.name }}</td>
                                    <td>{{ order.quantity }}</td>
                                    <td>{{ formatCurrency(order.price * order.quantity) }}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

            </main>

        </div>

    </div>
</template>
<style scoped>
.sidebar{
    margin-bottom: 10px;
    padding: 0;
}
.nav-link-sign-out{
    text-decoration: none;
    color: #fff
}
.nav-link{
    color: #000000;
}
.nav-link:hover{
    background-color: #f2ebeb
}

</style>
<script>
// import ProductService from "@/service/product.service"
export default {
    props: {
        products: { type: Array },
    },
};
</script>
<template>
    <div style="display: flex">
        <div>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <h1 class="h2">Danh Sách Món Ăn</h1>
            </div>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <router-link :to="{
                    name: 'dish.add',
                }">
                    <button class="btn"><i class="fas fa-plus" @click="goToAddDish"></i>Thêm Món Ăn</button>
                </router-link>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col-4 col-lg-2">Name</th>
                            <th scope="col-4 col-lg-2">detail</th>
                            <th scope="col-4 col-lg-2">Price</th>
                            <th scope="col-4 col-lg-2">Quantity</th>
                            <th scope="col-4 col-lg-2">Note</th>
                            <th scope="col-4 col-lg-2">image</th>
                            <th scope="col-4 col-lg-2">edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product) in products" :key="product._id">
                            <td style="width: 150px;">{{ product.name }}</td>
                            <td style="width: 500px;height: 48px;">{{ product.detail }}</td>
                            <td style="width: 100px;">{{ product.price }}</td>
                            <td style="width: 100px;">{{ product.quantity }}</td>
                            <td style="width: 200px;">{{ product.note }}</td>
                            <td><img style="width:200px; height: 150px; " :src="product.image" alt="ảnh món ăn"></td>
                            <td><router-link :to="{
                                name:'dish.edit',
                                params: {id: product._id}
                            }">
                                <i class="fa-solid fa-pen-to-square" style="width:60px;; font-size: 30px;margin-top: 60px;margin-left: 30px; color:#eaaf5c;"></i>
                                </router-link>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
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
th{
    border: 1px solid #dedede
}
td {
    border: 1px solid #dedede
}

.btn {
    font-weight: bold;
    background-color: #eaaf5c;
}

.btn:hover {
    background-color: #e19833;
}
.table-responsive{
    border: 1px solid #dedede;

    border-radius: 5px;
}
.col-lg-10{
    max-width: 100%;
    flex: 0 0 100%;
}
</style>
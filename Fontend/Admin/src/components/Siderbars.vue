<template>
    <div>
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse sticky-xl-top">
            <div class="position-sticky pt-3">
                <ul class=" list-group nav nav-pills flex-column mb-auto" style="width: 287px;">
                    <li class="list-group-item sidebar">
                        <router-link class="a" style="text-decoration: none;" :to="{
                            name: 'adminuser'
                        }">
                            Danh Sách User
                        </router-link>
                    </li>
                    <li class="list-group-item sidebar">
                        <router-link class="a" style="text-decoration: none;" :to="{
                            name: 'product.admindish'
                        }">
                            Danh Sách Món Ăn
                        </router-link>
                    </li>
                    <li class="list-group-item sidebar">
                        <router-link class="a" style="text-decoration: none;" :to="{
                            name: 'product.admincart'
                        }">
                            Danh Sách Đơn Hàng
                        </router-link>
                    </li>
                    <li class="list-group-item sidebar">
                        <router-link class="a" style="text-decoration: none;" :to="{
                            name: 'product.admindetailcart'
                        }">
                           Danh Sách Chi Tiết Đơn Hàng
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<style>
.a{
    color: #4a4a4a;
    font-weight: bold;
}
.a:hover{
    color: #333;
}
.sidebar:hover{
    background-color:#eaaf5c;
}
</style>
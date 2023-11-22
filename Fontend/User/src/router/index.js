import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/ContactBook.vue";
const routes = [
    {
        path: "/",
        name: "product",
        component: Product,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/alldish",
        name: "alldish",
        component: () => import("@/views/AllDish.vue"),
    },
    {
        path: "/contacts/:id",
        name: "contact.name",
        component: () => import("@/views/DetailDish.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/signup",
        name: "user.signup",
        component: () => import("@/views/SignUp.vue"),
    },
    {
        path: "/signin",
        name: "user.login",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/adminuser",
        name: "contact.adminuser",
        component: () => import("@/views/Admin/AdminUser.vue"),
    },
    {
        path: "/admindish",
        name: "contact.admindish",
        component: () => import("@/views/Admin/AdminDish.vue"),
    },
    {
        path: "/admincart",
        name: "contact.admincart",
        component: () => import("@/views/Admin/AdminCart.vue"),
    },
    {
        path: "/admindetailcart",
        name: "contact.admindetailcart",
        component: () => import("@/views/Admin/AdminDetailCart.vue"),
    },
    {
        path: "/detaildish/:id",
        name: "contact.detaildish",
        component: () => import("@/views/DetailDish.vue"),
        props:true,
    },
    {
        path: "/productcart",
        name: "product.productcart",
        component: () => import("@/views/ProductCart.vue"),
    },
    {
        path: "/order",
        name: "order",
        component: () => import("@/views/Order.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
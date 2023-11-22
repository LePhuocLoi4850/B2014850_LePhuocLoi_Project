import { createWebHistory, createRouter } from "vue-router";
import AdminUser from "@/views/AdminUser.vue";
// import SignIn from "@/views/SignIn.vue";
const routes = [
    {
        path: "/",
        name: "adminuser",
        component: AdminUser,
    },
    {
        path: "/user",
        name: "admin.user",
        component: AdminUser,
    },
    {
        path: "/login",
        name: "user.login",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/adddish",
        name: "dish.add",
        component: () => import("@/views/DishAdd.vue"),
    },
    {
        path: "/adduser",
        name: "user.add",
        component: () => import("@/views/UserAdd.vue"),
    },
    {
        path: "/editdish/:id",
        name: "dish.edit",
        component: () => import("@/views/DishEdit.vue"),
        props: true
    },
    {
        path: "/edituser/:id",
        name: "user.edit",
        component: () => import("@/views/UserEdit.vue"),
        props: true
    },
    
    {
        path: "/adminuser",
        name: "user.adminuser",
        component: () => import("@/views/DishAdd.vue"),
    },
    {
        path: "/admindish",
        name: "product.admindish",
        component: () => import("@/views/AdminDish.vue"),
    },
    {
        path: "/admincart",
        name: "product.admincart",
        component: () => import("@/views/AdminCart.vue"),
    },
    {
        path: "/admindetailcart",
        name: "product.admindetailcart",
        component: () => import("@/views/AdminDetailCart.vue"),
    },
    {
        path: "/productcart",
        name: "product.productcart",
        component: () => import("@/views/ProductCart.vue"),
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
export default router;
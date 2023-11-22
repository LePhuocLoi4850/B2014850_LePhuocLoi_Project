<template>
    <div>
        <body class="container">
            <div v-if="!isLoggedIn" class="page">
                <SignInForm :user="user" @submit:user="createUser" />
                <p>{{ message }}</p>
            </div>
            
        </body>
    </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
import UserService from "@/services/user.service";

export default {
    components: {
        SignInForm,
    },
    data() {
        return {
            user: {},
            message: "",
            isLoggedIn: false,
        };
    },
    methods: {
        async createUser(data) {
            try {
                const user = await UserService.login(data);
                this.message = user.message;

                if (this.message === "dang nhap thanh cong") {
                    // Set the login state in localStorage
                    localStorage.setItem("isLoggedIn", "true");

                    // Update the component's data
                    this.isLoggedIn = true;

                    alert("Đăng nhập thành công");
                    this.$router.push("/");
                } else {
                    alert("Thông tin đăng nhập không đúng");
                    this.user.email = "";
                    this.user.password = "";
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        // Check if the user is already logged in
        const storedLoginState = localStorage.getItem("isLoggedIn");
        this.isLoggedIn = storedLoginState === "flase";
        
    },
};
</script>

<style scoped>
header {
    background-color: #C58021;
    font-weight: 600;
}

.sidebar {
    margin-bottom: 10px;
    padding: 0;
}

.nav-link-sign-out {
    text-decoration: none;
    color: #fff
}

.navbar-nav {
    padding-right: 30px;
    font-size: 25px;
}

.navbar-brand {
    padding-left: 30px;
    font-size: 30px;
}

.nav-link {
    color: #000000;
}

.nav-link:hover {
    background-color: #f2ebeb
}

.icon_delete {
    color: red;
}</style>
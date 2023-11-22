<script>
export default {
    goToSignin() {
        this.$router.push({ name: "user.login" });
    },
}
</script>
<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form action="" class="signup-form">
                    <p class="title">Sign up</p>
                    <div class="input-field">
                        <i class="fa fa-user"></i>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div class="input-field">
                        <i class="fa fa-envelope"></i>
                        <input type="text" placeholder="Email" />
                    </div>
                    <div class="input-field">
                        <i class="fa fa-lock"></i>
                        <input type="text" placeholder="Password" />
                    </div>
                    <div class="input-field">
                        <i class="fa fa-map-location"></i>
                        <input type="text" placeholder="Address" />
                    </div>
                    <div class="input-field">
                        <i class="fa fa-phone"></i>
                        <input type="text" placeholder="Phone" />
                    </div>
                    <input type="submit" class="btn solid btn-hover" value="Login" />
                    <p>Bạn có tài khoản?
                        <router-link :to="{
                            name: 'user.login',
                        }">
                            <input type="submit" @click="goToSignin" class="btn signin-solid btn-signup-hover" value="Sign in" />
                        </router-link>
                    </p>
                    <div class="social-media">
                        <a href="" class="social-icon icon">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="" class="social-icon icon">
                            <i class="fab fa-tiktok"></i>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
@import "@/assets/style.css";

.btn-hover:hover {
    color: black;
}

.btn-signup-hover:hover {
    color: #C58021;
}
</style>
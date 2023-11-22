<script>
export default {
  data() {
    return {
      cartItemCount: 0, // Thêm biến để lưu số lượng sản phẩm trong giỏ hàng
    };
  },
  methods: {
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
    goToSignin() {
      this.$router.push({ name: "user.login" });
    },
    goToShoppingCart() {
      this.$router.push({ name: "product.productcart" });
    },
    watch: {
      '$router.state.cartItems'(newVal) {
        // Cập nhật số lượng sản phẩm trong giỏ hàng
        this.cartItemCount = newVal.length;
      },
    },
  }
}
</script>
<template>
  <div id="appHeader" class="site-header sticky-top py-1">
    <ul>
      <li><a href="/"><img src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg" alt=""></a></li>
      <ul>
        <li class="nav-tag"><a style="color: #fff" href="/">Trang Chủ</a></li>
        <li class="nav-tag"><a style="color: #fff" href="/alldish">Sản phẩm</a></li>
        <li class="nav-tag"><a style="color: #fff" href="/">Liên hệ</a></li>
        <li class="nav-tag"><a style="color: #fff" href="/order">Đơn hàng</a></li>
      </ul>
      <ul>    
        <li style="float:right">
          <router-link :to="{ name: 'product.productcart' }">
            <button style="color: #fff; padding:0px 16px; font-size: 1rem;" class="btn btn-sm " @click="goToShoppingCart">
              <i class="fa-solid fa-cart-shopping"></i>
              <!-- Hiển thị số lượng sản phẩm trong giỏ hàng -->
              <span v-if="cartItemCount > 0" style="margin-left: 5px; background-color: red; color: white; padding: 3px 6px; border-radius: 50%">{{ cartItemCount }}</span>
            </button>
          </router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>
<style scoped>
#appHeader {
  background-color: rgb(197, 128, 33);
  margin: 0 0 20px 0;
}

ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  justify-content: space-between;
  /* background-color: #333; */
}

li {
  float: left;
}

li a {
  display: inline-block;
  color: #020203;
  text-align: center;
  padding: 10px 16px;
  text-decoration: none;
  font-family: "Open_Sans variant0", Tofu;
  font-size: 20px;
}

.container {
  background-color: #69718B;
}

.nav-tag {
  margin-left: 20px;
}

.container {
  background-color: #69718B;
}
</style>
  
<script>
export default {
  methods: {
    logout() {
      localStorage.clear(),
      this.$router.push({ name: 'user.login'})
    }
  },
  computed: {
    isLoggedIn() {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      return !!localStorage.getItem('access_token');
    }
  }
 
}
</script>
<template>
  <header class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow" style="height:70px;">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Trang Admin</a>
    <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> -->
    
  </header>
</template>
<style scoped>
header{
  background-color:#C58021;
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
.navbar-nav{
  padding-right: 30px;
  font-size: 25px;
}
.navbar-brand{
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
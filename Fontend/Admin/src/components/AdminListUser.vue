<script>
export default {
    props: {
        users: { type: Array, favorite: true },
    },
};
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <h1 class="h2">Danh Sách User</h1>
                </div>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                    <router-link :to="{
                        name: 'user.add',
                    }">
                        <button class="btn"><i class="fas fa-plus" @click="goToAddDish"></i>Thêm User</button>
                    </router-link>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user) in users" :key="user._id">
                                <td style="width: 200px;">{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.password }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.phone }}</td>
                                <td><router-link :to="{
                                    name: 'user.edit',
                                    params: { id: user._id }
                                }">
                                        <i class="fa-solid fa-pen-to-square"
                                            style="font-size: 20px;padding-left: 35%;/*width:60px; font-size: 30px;margin-top: 60px;*/color:#eaaf5c;"></i>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
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

.icon_delete {
    color: red;
}

th {
    border: 1px solid #dedede
}

td {
    font-weight: 600;
    border: 1px solid #dedede;
    color: #4e4e4e;
}

.btn {
    font-weight: bold;
    background-color: #eaaf5c;
}

.btn:hover {
    background-color: #e19833;
}

.table-responsive {
    border: 1px solid #DEE2E6;
    border-radius: 5px;
}

.col-lg-10 {
    max-width: 100%;
    flex: 0 0 100%;
}</style>
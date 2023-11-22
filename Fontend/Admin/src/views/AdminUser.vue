<template>
    <AdminListUser :users="filteredUsers" />
</template>
<script>
import AdminListUser from "@/components/AdminListUser.vue"
import UserService from "@/services/user.service";

export default {
    components: {
        AdminListUser,
    },
    data() {
        return {
            users: [],
        };
    },
    computed: {
        filteredUsers() {
            if (!this.searchText) return this.users;
            return this.users.filter((_contact, index) =>
                this.userStrings[index].includes(this.searchText)
            );
        },
    },
    methods: {
        // user
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshListUsers() {
            this.retrieveUsers();
        },
    },
    mounted() {
        this.refreshListUsers();
    },
};
</script>
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
}</style>
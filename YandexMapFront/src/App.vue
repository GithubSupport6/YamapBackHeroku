<template>
    <div id="app">
        <div class="jumbotron">
            <h1 class="display-4">Yandex map application</h1>
            <div>
                <div class="row">
                    <div class="col-md-1">
                        <router-link to="/map">Map</router-link>
                    </div>
                    <div class="col-md-1">
                        <router-link to="/login">Login</router-link>
                    </div>
                    <div class="col-md-1">
                        <router-link to="/register">Register</router-link>
                    </div>
                    <div class="col-md-1">
                        <a class="router-link-exact-active router-link-active" v-on:click="logout">Log out</a>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Home from './components/Home.vue';
    import Axios from 'axios';
    

    export default {
        name: 'app',

        data: () => ({
             currentUser: false,
        }),

        methods: {
            logout: function(){
                Axios.get("http://localhost:8081/auth/logout", {withCredentials:true}).then(()=>{
                    this.$router.push("/login");
                })
            }
        },

        components: {
            Home
        }
    };

</script>

<style>
</style>

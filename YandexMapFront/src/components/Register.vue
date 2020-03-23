<template>
    <div class="home">    
        <div class="row justify-content-center">
            <div class="login-container col-md-2">
                <div class="row justify-content-center">
                    <p class="col-8" align="center">Create user</p>
                </div>
                <form class="row justify-content-center">
                    <div class="form-group">
                        <input v-model="login" class="form-control" type="text" placeholder="Login" />
                    </div>

                    <div class="form-group">
                        <input v-model="password" class="form-control" type="password" placeholder="Password" />
                    </div>

                    <div class="form-group">
                        <input v-on:click="register" class="btn btn-primary" type="submit" value="Create user"  />
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios').default;
    axios.defaults.baseURL = 'http://localhost:8081';

    export default {
        data() {
            return {
                login: null,
                password: null
            };
        },

        methods: {
            register: function () {
                axios
                    .post("/auth/register", {
                        params: {
                            username: this.login,
                            password: this.password
                        }
                    })
                    .then(()=>{
                        this.$router.push("/map");
                    })
            },
            
        }

    };


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
    <div class="home">
        
        <div class="row justify-content-center">
            
            <div class="login-container col-md-2">
                <div class="row">
                    <div class="col-md-4"></div>
                    <p class="col-md-4">Authorization</p>
                </div>
                <form>
                    <div class="form-group">
                        <input v-model="login" class="form-control" type="text" placeholder="Login" />
                    </div>

                    <div class="form-group">
                        <input v-model="password" class="form-control" type="password" placeholder="Password" />
                    </div>
                    <div v-if="status" class="row">
                        <div class="col-md-12">
                            <div class="alert alert-warning" role="alert">
                                <p>{{ status }}</p>
                            </div>
                        </div>
                    </div>   

                    <div class="form-group row justify-content-center">
                        <div class="col-4">
                            <input align="center" v-on:click="signin" class="btn btn-primary" type="submit" value="Login"  />
                        </div>
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
                password: null,
                status: null
            };
        },

        methods: {
            signin: function () {
                axios
                    .post("/auth/login", {
                        username: this.login,
                        password: this.password
                    },{withCredentials : true})
                    .then((res)=>{
                        if (res.data.status){
                            this.status = res.data.status
                        }
                        else{
                            this.status = null;
                            this.$router.push("/map");
                        }
                        
                    })
            },
            
        }

    };


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

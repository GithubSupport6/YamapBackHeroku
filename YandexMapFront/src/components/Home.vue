<template>
    <div class="home">
        <h1>{{ msg }}</h1>
        <p>This is home page of Yandex Map Application</p>
        <p>Login or register to see the map</p>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

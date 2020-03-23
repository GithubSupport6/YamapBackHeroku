import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router'
import HomeVue from './components/Home.vue';
import LoginVue from './components/Login.vue';
import MapVue from './components/Map.vue';
import RegisterVue from './components/Register.vue';

import BootstrapVue from 'bootstrap-vue';
import Axios from 'axios';

import YmapPlugin from 'vue-yandex-maps';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Store from './store';

Vue.config.productionTip = true;



Vue.use(BootstrapVue);

const mapSettings = {
    apiKey: '1d4e0e23-2edc-4925-a4c6-d6d0a8c0a975',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
};


Vue.use(YmapPlugin, mapSettings);


const router = new Router({
    routes: [
        {
            path: '/',
            component: HomeVue
        },
        {
            path: '/login',
            component: LoginVue
        },
        {
            path: '/map',
            component: MapVue,
            meta: {
                requestAuth:true
            }
        },
        {
            path: '/register',
            component: RegisterVue
        }
    ]
});

router.beforeEach((to,from,next)=>{
    if (to.meta.requestAuth){  
        Axios.get('http://localhost:8081/auth/user',{withCredentials:true}).then((val)=>{ 
            if (val.data.isAuthenticated){
                next();
            }
            else{
                router.push('/');
            }
        }).catch(err => {
            console.log(err);
        });
    }
    else
    {
        next();
    }
})

Vue.use(router);
Vue.use(Router);

new Vue({
    render: h => h(App),
    data: Store,
    router
}).$mount('#app');

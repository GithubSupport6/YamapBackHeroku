<template>
    <div class="home">

        <div class="row">
            <div class="list-container col-md-4">

                <div class="add-location-container">
                    <form>
                        <div class="form-group">
                            <p>Долгота</p>
                            <input v-model="currentMark.longitude" type="text" />
                        </div>

                        <div class="form-group">
                            <p>Широта</p>
                            <input v-model="currentMark.latitude" type="text" />
                        </div>

                        <div class="form-group">
                            <p>Название</p>
                            <input v-model="currentMark.name" type="text" />
                        </div>

                        <div class="form-group">
                            <input type="submit" v-if="!editParams.isEdit" v-on:click="add" value="Добавить">
                            <div v-if="editParams.isEdit" class="row">
                                <div class="col-md-3">
                                    <input type="submit"  v-on:click="edit" value="Редактировать">
                                </div>
                                <div class="col-md-3">
                                    <input type="submit"  v-on:click="cancelEdit" value="Отмена">
                                </div>
                            </div>
                            
                        </div>
                    </form>
                    
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Долгота</th>
                            <th scope="col">Широта</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tr class="mark-elem" v-for="mark in marks" v-bind:key = mark.name v-on:click="movemap(mark.longitude,mark.latitude)">
                        <td scope="col" >{{ mark.name }}</td>
                        <td scope="col"> {{ mark.longitude }} </td>
                        <td scope="col"> {{ mark.latitude }} </td>
                        <td scope="col">
                            <button class="btn btn-primary" v-on:click="choose(mark.name)">Редактировать</button>
                        </td>
                        <td scope="col">
                            <button class="btn btn-danger" v-on:click="remove(mark.name)">Удалить</button>
                        </td>
                    </tr>
                </table>


            </div>

            <div class="map-container col-md-8" >
                <yandex-map
                            :coords="coords"
                            style="height:600px"
                            v-on:map-was-initialized="initmap">
                    <ymap-marker
                        v-for="mark in marks"
                        :key="mark.name"
                        :markerId="mark.name"
                        :coords ="[mark.longitude , mark.latitude]"
                        :balloon ="{header: mark.name }"
                    />
                </yandex-map>
            </div>
        </div>

    </div>
</template>

<script>
    import { yandexMap, ymapMarker } from 'vue-yandex-maps'
    import { loadYmap } from 'vue-yandex-maps'
    const axios = require('axios').default;
    const router = require('vue-router');

    export default {
        components: { yandexMap, ymapMarker, loadYmap },

         data: () => ({
             coords: [0, 0],
             currentMark: {
                longitude : null,
                latitude: null,
                name: null,
             },
             marks: [],
             editParams: {
                isEdit:false,
                indexToEdit: null,
                oldName: null
             },
             test:null     
        }),

         methods: {
            add: function () {
                axios
                    .post("map/add-mark", this.currentMark, {withCredentials:true})
                    .then(()=>{
                            this.coords = [this.currentMark.longitude, this.currentMark.latitude];
                            this.marks.push(this.currentMark);
                            this.currentMark = {
                                latitude : null,
                                longitude:null,
                                name:null
                            }
                    })
                    .catch((err)=>
                    {
                        alert(err);
                    }
                 )
             },

             remove: function (name) {
                 axios
                    .post("map/delete-mark",
                        { name: name, },
                        {withCredentials:true}
                    )
                     .then(() => {
                         let mark = this.marks.find(item => item.name == name);
                         this.marks.splice(this.marks.indexOf(mark), 1);
                     })
                     .catch((err)=>{
                         alert(err);
                     });
             },

            edit: function(){
                axios.post("map/edit-mark",{newMark: this.currentMark, oldName: this.editParams.oldName},{withCredentials:true}).
                    then(()=>{
                        this.marks[this.editParams.indexToEdit] = {
                            latitude: this.currentMark.latitude,
                            longitude: this.currentMark.longitude,
                            name: this.currentMark.name
                        }
                        this.currentMark.longitude = null,
                        this.currentMark.latitude = null,
                        this.currentMark.name = null;
                    });
            },
            
            cancelEdit: function(){
                this.editParams.isEdit = false;
                this.currentMark = {
                    latitude:null,
                    longitude:null,
                    name: null
                }
            },

            choose: function(name){
                this.editParams.indexToEdit = this.marks.findIndex(val=>val.name == name);
                let mark = this.marks.find(item => item.name == name);
                this.currentMark = {
                    latitude: mark.latitude,
                    longitude : mark.longitude,
                    name: mark.name
                }
                this.editParams.isEdit = true;
                
                this.editParams.oldName = name;
            },

             movemap: function (longitude, latitude) {
                 this.coords = [longitude, latitude];
             },

             initmap: function () {
                 let location = ymaps.geolocation.get();
                 location.then(
                    (res)=>{
                        this.coords = [res.geoObjects.position[0],res.geoObjects.position[1]];
                        this.test = res;
                    }
                 )

             }

        },

        async mounted() {
            axios.defaults.baseURL = 'http://localhost:8081';

            await loadYmap(); 

            axios
                .get("/map/get-marks",{withCredentials:true})
                .then(responce => this.marks = responce.data.marks)
                .catch((reason)=>{
                    if (reason.status == 401){
                        router.default.call()
                    }
            });
            
        }
    }
</script>

<style scoped>
    .mark-elem:hover{
        background-color: #28a745;
    }

    .mark-elem:hover:p{
        text-decoration: underline;
    }
</style>
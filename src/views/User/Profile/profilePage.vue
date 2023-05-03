<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>PROFILE PAGE</h4>
                        <hr />
                        <form>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama User</label>
                                <input type="text" class="form-control" v-model="user.nama"
                                    placeholder="Masukkan nama user" disabled/>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email User</label>
                                <input class="form-control" v-model="user.email"
                                    placeholder="Masukkan email user" disabled/>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Telepon User</label>
                                <input class="form-control" v-model="user.telepon"
                                    placeholder="Masukkan telepon user" disabled/>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat User</label>
                                <input class="form-control" v-model="user.alamat"
                                    placeholder="Masukkan alamat user" disabled/>
                            </div>
                            <router-link :to="{ name: 'user.profile.edit' }" 
                                        class="btn btn-sm btn-primary mr-1">EDIT PROFILE</router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    export default {
        setup() {
            //state user
            const user = reactive({
                nama: "",
                email: "",
                password: "",
                telepon: "",
                alamat: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const id = localStorage.getItem('id')

            onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/user/" + id,)
                .then(response => {
                    //assign state posts with response data
                    user.nama = response.data.data.nama
                    user.email = response.data.data.email
                    user.password = response.data.data.password
                    user.telepon = response.data.data.telepon
                    user.alamat = response.data.data.alamat
                }).catch(error => {
                    console.log(error.response.data)
                })
            })
            //return
            return {
                user,
                validation,
                router,
            };
        },
    };

</script>
<style>

</style>

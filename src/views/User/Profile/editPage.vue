<template>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="card border-0 rounded shadow">
                        <div class="card-body">
                            <h4>EDIT PROFILE PAGE</h4>
                            <hr />
                            <form @submit.prevent="update">
                                <div class="form-group mb-3">
                                    <label class="form-label">Nama User</label>
                                    <input type="text" class="form-control" v-model="user.nama"
                                        placeholder="Masukkan nama user"/>
                                    <!-- validation -->
                                    <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                        {{ validation.nama[0] }}
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="content" class="form-label">Email User</label>
                                    <input class="form-control" v-model="user.email"
                                        placeholder="Masukkan email user" />
                                    <!-- validation -->
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="content" class="form-label">Password User</label>
                                    <input class="form-control" v-model="user.password"
                                        placeholder="Masukkan password user" />
                                    <!-- validation -->
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        {{ validation.password[0] }}
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="content" class="form-label">Telepon User</label>
                                    <input class="form-control" v-model="user.telepon"
                                        placeholder="Masukkan telepon user" />
                                    <!-- validation -->
                                    <div v-if="validation.telepon" class="mt-2 alert alert-danger">
                                        {{ validation.telepon[0] }}
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="content" class="form-label">Alamat User</label>
                                    <input class="form-control" v-model="user.alamat"
                                        placeholder="Masukkan alamat user" />
                                    <!-- validation -->
                                    <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                        {{ validation.alamat[0] }}
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">SIMPAN</button>
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
        import { useToast } from "vue-toastification";
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
    
                //method update
                function update() {
                    let nama = user.nama;
                    let email = user.email;
                    let password = user.password;
                    let telepon = user.telepon;
                    let alamat = user.alamat;
    
                    let toast = useToast();
                    axios
                        .put("http://localhost:8000/api/user/" + id, {
                            nama: nama,
                            email: email,
                            password: password,
                            telepon: telepon,
                            alamat: alamat,
                        })
                        .then(() => {
                            toast.success("Berhasil Edit Data !",{
                                timeout: 2000
                            })
                            //redirect ke post index
                            router.push({
                                name: "user.profile.view",
                            });
                        })
                        .catch((error) => {
                            //assign state validation with error
                            validation.value = error.response.data;
                        });
                }
                //return
                return {
                    user,
                    validation,
                    router,
                    update,
                };
            },
        };
    
    </script>
    <style>
    
    </style>
    

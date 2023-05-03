<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT INSTRUKTUR</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <!-- <input type="text" class="form-control" v-model="instruktur.nama"
                                    placeholder="Masukkan nama instruktur" /> -->
                                    <v-text-field label="Masukan nama instruktur" variant="solo" v-model="instruktur.nama" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Umur</label>
                                <!-- <input type="text" class="form-control" v-model="instruktur.umur"
                                    placeholder="Masukkan umur" /> -->
                                    <v-text-field label="Masukan Umur Instruktur" variant="solo" v-model="instruktur.umur" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.umur" class="mt-2 alert alert-danger">
                                    {{ validation.umur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <!-- <input type="text" class="form-control" v-model="instruktur.umur"
                                    placeholder="Masukkan umur" /> -->
                                    <v-text-field label="Masukan Email Instruktur" variant="solo" v-model="instruktur.email" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Password</label>
                                <!-- <input type="text" class="form-control" v-model="instruktur.password"
                                    placeholder="Masukkan password" /> -->
                                    <v-text-field label="Masukan Password" variant="solo" v-model="instruktur.password" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
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
    import { useRouter, useRoute } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state product
            const instruktur = reactive({
                nama: "",
                umur: "",
                password: "",
                email: ""
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const email = route.params.email;
            const password= route.params.password;
            // const token = localStorage.getItem('token')

            onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            //get API from Laravel Backend
            axios
                .get(`http://192.168.100.111/p3l/gopit_backend/public/instruktur/${email}/${password}`)
                .then(response => {
                    //assign state posts with response data
                    instruktur.nama = response.data.data.nama
                    instruktur.umur = response.data.data.umur
                    instruktur.password = response.data.data.password
                    instruktur.email = response.data.data.email
                }).catch(error => {
                    console.log("email: ", email);
                    console.log("pass: ", password);
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let nama = instruktur.nama;
                let umur = instruktur.umur;
                let password = instruktur.password;
                let email = instruktur.email;

                let toast = useToast();
                axios
                    .put(`http://192.168.100.111/p3l/gopit_backend/public/instruktur/${route.params.id_instruktur}`, {
                        nama: nama,
                        umur: umur,
                        password: password,
                        email: email
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Instruktur !",{
                            timeout: 2000
                        })
                        // redirect ke post index
                        router.push({
                            name: "admin.instruktur.index",
                        });
                    })
                    .catch((error) => {
                        console.log("pass: ", password);
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                instruktur,
                validation,
                router,
                update,
            };
        },
    };
</script>

<style>
    .custom-text-field-height {
        height: 55px;
    }
</style>

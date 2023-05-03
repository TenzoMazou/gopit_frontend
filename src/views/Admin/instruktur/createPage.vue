<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTRUKTUR</h4>
                        <hr />
                        <form @submit.prevent="store">
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
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state instruktur
            const instruktur = reactive({
                nama: "",
                umur: "",
                password: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //method store
            function store(){
                validation.value = [];
                    
                let instruktur = new FormData();
                instruktur.append('nama', this.instruktur.nama);
                instruktur.append('umur', this.instruktur.umur);
                instruktur.append('password', this.instruktur.password);

                let toast = useToast();

                if (!instruktur.get("nama")) {
                    validation.value.nama = ["Nama Instruktur harus diisi"];
                }
                if (!instruktur.get("umur")) {
                    validation.value.umur = ["Umur Instruktur harus diisi"];
                }
                if (!instruktur.get("password")) {
                    validation.value.password = ["Password harus diisi"];
                }

                // If there are any error messages, prevent the form from being submitted and show the error messages to the user
                if (Object.keys(validation.value).length > 0) {
                    return;
                }

                // const token = localStorage.getItem('token')
                // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post("http://192.168.100.111/p3l/gopit_backend/public/instruktur", instruktur)
                .then(() => {
                    toast.success("Berhasil Register Instruktur !",{
                            timeout: 2000
                        })
                    router.push({
                            name: "admin.instruktur.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        console.log(error.response.data.data);
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                instruktur,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>
    .custom-text-field-height {
        height: 55px;
    }
</style>

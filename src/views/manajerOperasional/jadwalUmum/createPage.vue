<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Hari</label>
                                <input type="text" class="form-control" v-model="jadwalumum.hari"
                                    placeholder="Masukkan Hari" />
                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Kelas</label>
                                <v-select v-model="jadwalumum.nama_kelas"
                                    label="Pilih Kelas"
                                    clearable
                                    :items="['SPINE Corrector', 'MUAYTHAI', 'PILATES', 'ASTHANGA', 'Body Combat', 'ZUMBA', 
                                    'HATHA', 'Wall Swing', 'Basic Swing', 'Bellydance', 'BUNGEE', 'Yogalates', 'BOXING', 'Calisthenics']"
                                    variant="solo"
                                    class="custom-text-field-height"
                                ></v-select>
                                <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.umur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <!-- <v-select v-model="jadwalumum.nama_kelas"
                                    label="Pilih Kelas"
                                    clearable
                                    :items="['SPINE Corrector', 'MUAYTHAI', 'PILATES', 'ASTHANGA', 'Body Combat', 'ZUMBA', 
                                    'HATHA', 'Wall Swing', 'Basic Swing', 'Bellydance', 'BUNGEE', 'Yogalates', 'BOXING', 'Calisthenics']"
                                    variant="solo"
                                    class="custom-text-field-height"
                                ></v-select> -->
                                    <select class="form-control" v-model="jadwalumum.nama">
                                    <option value="" selected hidden disabled>Pilih Instruktur</option>
                                    <option value="John WIck">John Wick</option>
                                    <option value="Lady">Lady</option>
                                    <option value="Vergil">Vergil</option>
                                    <option value="Helen">Helen</option>
                                    
                                </select>
                                <!-- <v-autocomplete
                                    v-model="instruktur.nama"
                                    :items="insOptions"
                                    item-text="nama"
                                    required
                                ></v-autocomplete> -->
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Jam</label>
                                <input type="time" class="form-control" v-model="jadwalumum.Jam"
                                    placeholder="Masukkan Jam" />
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
            const jadwalumum = reactive({
                hari: "",
                nama_kelas: "",
                nama: "",
                Jam: "",
            });
            //state validation
            const validation = ref([]);

            // const insOptions = ref([]);
            //vue router
            const router = useRouter();


            //method store
            function store(){
                let jadwalumum = new FormData();
                jadwalumum.append('hari', this.jadwalumum.hari);
                jadwalumum.append('nama_kelas', this.jadwalumum.nama_kelas);
                jadwalumum.append('nama', this.jadwalumum.nama);
                jadwalumum.append('Jam', this.jadwalumum.Jam);

                let toast = useToast();

                // const token = localStorage.getItem('token')
                // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post("http://192.168.100.111/p3l/gopit_backend/public/jadwalumum", jadwalumum)
                .then(() => {
                    toast.success("Berhasil Menambah Jadwal Umum !",{
                            timeout: 2000
                        })
                    router.push({
                            name: "mo.jadwalumum.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        console.log(error.response.data.data);
                        validation.value = error.response.data
                    });
            }

            // function loadinsOptions(){
            //     // fetch data from instruktur database
            //     axios.get('http://192.168.100.111/p3l/gopit_backend/public/instruktur')
            //         .then(response => {
            //             // map response data to an array of options
            //             insOptions.value = response.data.data.map((instruktur) => {
            //                 return {
            //                     id_instruktur: instruktur.id_instruktur,
            //                     nama: instruktur.nama
            //                 };
            //             });
            //         })
            //         .catch(error => {
            //             console.error(error);
            //         });
            //     }
            //return

            // loadinsOptions();
            
            return {
                jadwalumum,
                validation,
                router,
                // insOptions,
                // loadinsOptions,
                store,
                
            };
        },
    };

</script>
<style>

</style>

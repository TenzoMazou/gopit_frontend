<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL HARIAN</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Hari</label>
                                <input type="text" class="form-control" v-model="jadwalumum.hari"
                                    placeholder="Masukkan Tanggal" />
                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Kelas</label>
                                <select class="form-control" v-model="jadwalumum.nama_kelas">
                                    <option value="" selected hidden disabled>Pilih Kelas</option>
                                    <option value="SPINE Corrector">SPINE Corrector</option>
                                    <option value="MUAYTHAI">MUAYTHAI</option>
                                    <option value="PILATES">PILATES</option>
                                    <option value="ASTHANGA">ASTHANGA</option>
                                    <option value="Body Combat">Body Combat</option>
                                    <option value="ZUMBA">ZUMBA</option>
                                    <option value="HATHA">HATHA</option>
                                    <option value="Wall Swing">Wall Swing</option>
                                    <option value="Basic Swing">Basic Swing</option>
                                    <option value="Bellydance">Bellydance</option>
                                    <option value="BUNGEE">BUNGEE</option>
                                    <option value="Yogalates">Yogalates</option>
                                    <option value="BOXING">BOXING</option>
                                    <option value="Calisthenics">Calisthenics</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.umur" class="mt-2 alert alert-danger">
                                    {{ validation.umur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Jam</label>
                                <input type="time" class="form-control" v-model="jadwalumum.Jam"
                                    placeholder="Masukkan Jam" />
                                <!-- validation -->
                                <div v-if="validation.Jam" class="mt-2 alert alert-danger">
                                    {{ validation.Jam[0] }}
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
            const jadwalumum = reactive({
                hari: "",
                nama_kelas: "",
                nama: "",
                Jam: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const id = route.params.id;

            onMounted(() => {
            
            axios.get(`http://192.168.100.111/p3l/gopit_backend/public/jadwalumum/${id}`)
            .then(response => {
                console.log(response.data)
                jadwalumum.Jam = response.data.data[0].Jam
                jadwalumum.hari = response.data.data[0].hari
                jadwalumum.nama = response.data.data[0].nama
                jadwalumum.nama_kelas = response.data.data[0].nama_kelas

            }).catch(error => {
                console.log(error.response.data.data);
            })
            })

            //method update
            function update() {
                let hari = jadwalumum.hari;
                let nama = jadwalumum.nama;
                let Jam = jadwalumum.Jam;
                let nama_kelas = jadwalumum.nama_kelas;

                let toast = useToast();
                axios.put(`http://192.168.100.111/p3l/gopit_backend/public/jadwalumum/${route.params.id}`, {
                        hari: hari,
                        nama: nama,
                        Jam: Jam,
                        nama_kelas : nama_kelas
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Data !",{
                            timeout: 2000
                        })
                        // redirect ke post index
                        router.push({
                            name: "mo.jadwalumum.index",
                        });
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                jadwalumum,
                validation,
                router,
                update,
            };
        },
    };
</script>

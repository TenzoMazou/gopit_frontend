<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">PRESENSI KELAS</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- <router-link :to="{ name: 'admin.instruktur.create' }" class="btn btn-md btn-success mb-4">Tambah Instruktur</router-link> -->
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(presensikelas, id) in presensikelas" :key="id" class="text-center">
                                    <td>{{ presensikelas.nama_member }}</td>
                                    <td>{{ presensikelas.status }}</td>
                                    <td>{{ formatDate(presensikelas.tanggal_booking) }}</td>
                                    <td>{{ presensikelas.nama_kelas }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'kasir.struk.kelas', params: {
                                                id: presensikelas.id,
                                                id_member: presensikelas.id_member,
                                                Tanggal_lahir: presensikelas.Tanggal_lahir
                                            }}"
                                            class="btn btn-sm btn-success ml-1 custom-btn">STRUK PRESENSI KELAS REGULER</router-link>
                                            <router-link :to="{ name: 'kasir.struk.kelasPaket', params: {
                                                id: presensikelas.id,
                                                id_member: presensikelas.id_member,
                                                Tanggal_lahir: presensikelas.Tanggal_lahir
                                            }}"
                                            class="btn btn-sm btn-success ml-1 custom-btn">STRUK PRESENSI KELAS PAKET</router-link>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
// import { onMounted, ref,computed } from 'vue'
// import { useToast } from "vue-toastification";
export default {
    setup() {
        let presensikelas = ref([])

        onMounted(() => {
        axios
            .get('http://192.168.100.111/p3l/gopit_backend/public/presensikelas')
            .then(response => {
                presensikelas.value = response.data.data
                console.log('response', presensikelas.value);
            })
            .catch(error => {
            console.log(error.response.data.data);
            })
        })

        const formatDate = computed(() => {
        return function(date) {
                const options = {   
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric' 
                                }
                return new Date(date).toLocaleDateString('id-ID', options)
            }
        })

        return {
            presensikelas,
            formatDate
        }
    }
}
</script>
<style>
    .custom-text-field-width {
        width: 500px; /* example width */
    }
</style>

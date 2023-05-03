<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST JADWAL</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'mo.jadwalumum.create' }" class="btn btn-md btn-success mb-4">Tambah Jadwal</router-link>
                        <th scope="rowgroup">MORNING CLASS</th>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">HARI</th>
                                    <th scope="col">JADWAL KELAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwalumum, id) in groupedJadwalUmum" :key="id">
                                    <td >{{ jadwalumum[0].hari }}</td>
                                    <td>
                                        {{ jadwalumum[0].Jam }} <br>
                                        {{ jadwalumum[0].nama_kelas }} <br>
                                        {{ jadwalumum[0].nama }} <br>
                                    </td>
                                    <td>
                                    <router-link :to="{ name: 'mo.jadwalumum.edit', params: { id: jadwalumum[0].id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                    <button @click.prevent="instrukturDelete(jadwalumum[0].id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-body">
                        <!-- <router-link :to="{ name: 'mo.jadwalumum.create' }" class="btn btn-md btn-success mb-4">Tambah Jadwal</router-link> -->
                        <th scope="rowgroup">EVENING CLASS</th>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">HARI</th>
                                    <th scope="col">JADWAL KELAS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(jadwalumum, id) in jadwalumum.filter(jadwalumum => jadwalumum.Jam >= '12:00' && jadwalumum.Jam < '23:59')" :key="id" class="text-center">
                                    <td>{{ jadwalumum.hari }}</td>
                                    <td>{{ jadwalumum.nama_kelas }}</td>
                                    <td>{{ jadwalumum.nama }}</td>
                                    <td>{{ jadwalumum.Jam }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'mo.jadwalumum.edit', params: { 
                                            id: jadwalumum.id
                                            }}" 
                                        class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="instrukturDelete(jadwalumum.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr> -->
                                <tr v-for="(jadwalumum, id) in groupedJadwalUmum2" :key="id">
                                    <td >{{ jadwalumum[0].hari }}</td>
                                    <td>
                                        {{ jadwalumum[0].Jam }} <br>
                                        {{ jadwalumum[0].nama_kelas }} <br>
                                        {{ jadwalumum[0].nama }} <br>
                                    </td>
                                    <td>
                                    <router-link :to="{ name: 'mo.jadwalumum.edit', params: { id: jadwalumum[0].id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                    <button @click.prevent="instrukturDelete(jadwalumum[0].id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
// import moment from 'moment'
import { onMounted, ref, computed } from 'vue'
import { useToast } from "vue-toastification";
export default {
    
    setup() {
        
        let jadwalumum = ref([])

        // const token = localStorage.getItem('token')
        
        let toast = useToast();
        
        const groupedJadwalUmum = computed(() => {
            const filteredData = jadwalumum.value.filter(item => item.Jam >= '00:00' && item.Jam < '11:59');
        const groups = {};
        filteredData.forEach((item) => {
            const key = `${item.hari}-${item.nama_kelas}`;
            if (!groups[key]) {
            groups[key] = [];
            }
            groups[key].push(item);
        });
        return Object.values(groups);
        });

        const groupedJadwalUmum2 = computed(() => {
            const filteredData = jadwalumum.value.filter(item => item.Jam >= '12:00' && item.Jam < '23:59');
            
        const groups = {};
        filteredData.forEach((item) => {
            const key = `${item.hari}-${item.nama_kelas}`;
            if (!groups[key]) {
            groups[key] = [];
            }
            groups[key].push(item);
        });
        return Object.values(groups);
        });

        const formatDate = computed(() => {
        return function(date) {
                const options = { weekday: 'long' }
                return new Date(date).toLocaleDateString('id-ID', options)
            }
        })

        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://192.168.100.111/p3l/gopit_backend/public/jadwalumum')
            .then(response => {
                jadwalumum.value = response.data.data
                console.log('response', jadwalumum.value);
            }).catch(error => {
                console.log(error.response.data.data);
            })            
        })
        //method delete
        function instrukturDelete(id) {

            axios.delete(`http://192.168.100.111/p3l/gopit_backend/public/jadwalumum/${id}`)
            .then(() => {
                        toast.error("Berhasil Hapus Data !",{
                            timeout: 2000
                        })
                        jadwalumum.value.splice(jadwalumum.value.indexOf(id));
                        window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        return {
            jadwalumum,
            instrukturDelete,
            formatDate,
            groupedJadwalUmum,
            groupedJadwalUmum2
        }
    }
}
</script>
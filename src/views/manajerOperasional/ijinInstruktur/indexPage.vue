<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">LIST IJIN INSTRUKTUR</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <th scope="rowgroup">CONFIRMED STATUS</th>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">STATUS IJIN</th>
                                    <th scope="col">TANGGAL KELAS</th>
                                    <th scope="col">TANGGAL IJIN</th>
                                    <th scope="col">ALASAN</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(ijinInstruktur, id) in confirmedUsers" :key="id" class="text-center">
                                    <td>{{ ijinInstruktur.nama }}</td>
                                    <td>{{ ijinInstruktur.status_ijin }}</td>
                                    <td>{{ ijinInstruktur.tanggal_kelas }}</td>
                                    <td>{{ ijinInstruktur.tanggal_izin }}</td>
                                    <td>{{ ijinInstruktur.alasan }}</td>
                                </tr>   
                            </tbody>
                        </table>
                        <th scope="rowgroup">STATUS NOT CONFIRMED</th>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">STATUS IJIN</th>
                                    <th scope="col">TANGGAL KELAS</th>
                                    <th scope="col">TANGGAL IJIN</th>
                                    <th scope="col">ALASAN</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(ijinInstruktur, id) in notConfirmedUsers" :key="id" class="text-center">
                                    <td>{{ ijinInstruktur.nama }}</td>
                                    <td>{{ ijinInstruktur.status_ijin }}</td>
                                    <td>{{ ijinInstruktur.tanggal_kelas }}</td>
                                    <td>{{ formatDate(ijinInstruktur.tanggal_izin) }}</td>
                                    <td>{{ ijinInstruktur.alasan }}</td>
                                    <td class="text-center">
                                        <!-- <button @click.prevent="ConfirmStatus(ijinInstruktur.id)" class="btn btn-sm btn-danger ml-1">Confirm Status</button> -->
                                        <button @click.prevent="showDialog = true; selectedIjinInstruktur = ijinInstruktur" class="btn btn-sm btn-danger ml-1">Confirm Status</button>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
                <v-dialog v-model="showDialog" max-width="500px">
                    <v-card>
                        <v-card-title>Confirm Status</v-card-title>
                        <v-card-text> Are you sure you want to confirm the status of this user?</v-card-text>
                        <v-card-actions>
                            <v-btn color="red" text @click="showDialog = false">Cancel</v-btn>
                            <v-btn color="green" @click="ConfirmStatus(selectedIjinInstruktur.id)">Confirm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref,computed } from 'vue'
// import { useRouter } from "vue-router"
import { useToast } from "vue-toastification";
export default {
    data() {
        return {
            showDialog: false,
            selectedIjinInstruktur: null,
        }
    },
    setup() {
        const ijinInstruktur = ref([])

        // const token = localStorage.getItem('token')
        // const router = useRouter();
        let toast = useToast();
        // const searchText = ref('');
        // const filteredijinInstruktur = computed(() => {
        //     return ijinInstruktur.value.filter(ijinInstruktur => {
        //         return ijinInstruktur.nama.toLowerCase().includes(searchText.value.toLowerCase())
        //     })
        // })

        const confirmedUsers = computed(() => {
            return ijinInstruktur.value.filter((ijinInstruktur) => ijinInstruktur.status_ijin === "confirmed")
        })

        const notConfirmedUsers = computed(() => {
            return ijinInstruktur.value.filter((ijinInstruktur) => ijinInstruktur.status_ijin !== "confirmed")
        })

        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get('http://192.168.100.111/p3l/gopit_backend/public/ijininstruktur')
            .then(response => {
                ijinInstruktur.value = response.data.data
                console.log('response', ijinInstruktur.value);
            }).catch(error => {
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

    // async function ConfirmStatus(id) {
    // try {
    //     const res = await axios.get(`http://192.168.100.111/p3l/gopit_backend/public/ijininstruktur/${id}`);
    //     if (res.data.data.length === 0) {
    //     throw new Error(`Item with id ${id} not found`);
    //     }
    //         const ijinInstruktur = res.data.data[0];
    //         ijinInstruktur.status_ijin = 'confirmed';
    //     await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/ijininstruktur/${id}`, ijinInstruktur);
    //         toast.success("Berhasil Confirm Status !",{
    //             timeout: 2000
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error.message, {
    //             timeout: 2000
    //         });
    //     }
    // }

    async function ConfirmStatus(id) {
        let ijinInstruktur;
        try {
            if (!id) {
                throw new Error(`Invalid id: ${id}`);
            }
            const res = await axios.get(`http://192.168.100.111/p3l/gopit_backend/public/ijininstruktur/${id}`);
            if (res.data.data.length === 0) {
            throw new Error(`Item with id ${id} not found`);
            }
            const ijinInstruktur = res.data.data[0];
            ijinInstruktur.status_ijin = 'confirmed';

            await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/ijininstruktur/${id}`, ijinInstruktur);

            // Update status_kelas of jadwal_harian if ijin_instruktur is confirmed
            if (ijinInstruktur.status_ijin.toLowerCase() === 'confirmed') {
            const jadwalHarianRes = await axios.get(`http://192.168.100.111/p3l/gopit_backend/public/jadwalharian`);
            const jadwalHarian = jadwalHarianRes.data.data;

            jadwalHarian.forEach(async (item) => {
                if (item.id_jadwal === ijinInstruktur.id_jadwal && item.tanggal_izin === ijinInstruktur.tanggal_izin) {
                    item.status_kelas = 'Libur';
                    await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/jadwalharian/${item.id}`, item);
                }
                });
            }
            toast.success("Berhasil Confirm Status !",{
            timeout: 2000
            });
            // this.showDialog = false;
        } catch (error) {
            console.log(ijinInstruktur?.value?.id);
            console.error(error);
            toast.error(error.message, {
            timeout: 2000
            });
        }
    }
    
        return {
            ijinInstruktur,
            // filteredijinInstruktur,
            // searchText,
            confirmedUsers,
            notConfirmedUsers,
            ConfirmStatus,
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
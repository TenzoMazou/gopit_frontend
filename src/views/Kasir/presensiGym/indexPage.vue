<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">PRESENSI GYM</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- PRESENSI GYM TABLE -->
                        <button class="btn btn-md btn-success mb-4" @click="generatePresensi">Tambah Presensi Gym</button>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">SLOT WAKTU</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(presensigym, id) in presensigym" :key="id" class="text-center">
                                    <td>{{ presensigym.nama_member }}</td>
                                    <td>{{ presensigym.status }}</td>
                                    <td>{{ formatDate(presensigym.tanggal) }}</td>
                                    <td>{{ presensigym.slot_waktu }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'admin.instruktur.edit', params: { 
                                            id_instruktur: instruktur.id_instruktur,
                                            email: instruktur.email,
                                            password: instruktur.password
                                            }}" 
                                        class="btn btn-sm btn-primary mr-1"><v-icon size="15">mdi-pencil</v-icon>EDIT</router-link>
                                        &nbsp; -->
                                        <!-- <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1"><v-icon size="15">mdi-trash-can-outline</v-icon>DELETE</button> -->
                                        <router-link :to="{ name: 'kasir.struk.presensi', params: {
                                                id: presensigym.id,
                                                id_member: presensigym.id_member,
                                                Tanggal_lahir: presensigym.Tanggal_lahir
                                            }}" 
                                            class="btn btn-sm btn-success ml-1 custom-btn">STRUK PRESENSI GYM</router-link>
                                            &nbsp;
                                            <button @click.prevent="showDialog = true; selectedPresensiGym = presensigym" class="btn btn-sm btn-danger ml-1">Confirm Status Hadir</button>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                    <v-dialog v-model="showDialog" max-width="500px">
                    <v-card>
                        <v-card-title>Confirm Status Kehadiran</v-card-title>
                        <v-card-text> Are you sure you want to confirm the status of this member?</v-card-text>
                        <v-card-actions>
                            <v-btn color="red" text @click="showDialog = false">Cancel</v-btn>
                            <v-btn color="green" @click="confirmStatus(selectedPresensiGym.id)">Confirm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
// import { onMounted, ref,computed } from 'vue'
import { useToast } from "vue-toastification";
export default {
    data() {
        return {
            showDialog: false,
            selectedPresensiGym: null,
        }
    },
    setup() {
        let presensigym = ref([])

        let toast = useToast();

        onMounted(() => {
        axios
            .get('http://192.168.100.111/p3l/gopit_backend/public/presensigym')
            .then(response => {
                presensigym.value = response.data.data
                console.log('response', presensigym.value);
            })
            .catch(error => {
            console.log(error.response.data.data);
            })
        })

            const generatePresensi = async () => {
            try {

                if (presensigym.value.length > 0) {
                    console.log('Schedule already generated')
                    toast.error('The Schedule already generated')
                    return
                }
                const response = await axios.post('http://192.168.100.111/p3l/gopit_backend/public/presensigym')
                presensigym.value = response.data.presensigym
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }

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
        //     let presensigym;
        //     try {
        //         if (!id) {
        //             throw new Error(`Invalid id: ${id}`);
        //         }
        //         const res = await axios.get(`http://192.168.100.111/p3l/gopit_backend/public/presensigym/${id}`);
        //         if (res.data.data.length === 0) {
        //         throw new Error(`Item with id ${id} not found`);
        //         }
        //         const presensigym = res.data.data[0];
        //         presensigym.status = 'hadir';

        //         await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/presensigym/${id}`, presensigym);

        //         toast.success("Berhasil Confirm Status !",{
        //         timeout: 2000
        //         });
        //         // this.showDialog = false;
        //     } catch (error) {
        //         console.log(presensigym?.value?.id);
        //         console.error(error);
        //         toast.error(error.message, {
        //         timeout: 2000
        //         });
        //     }
        // }

        const confirmStatus = async (id) => {
        try {
            await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/presensigym/${id}`, {
            status: 'Hadir'
            });
            // Update the status locally
            const updatedPresensiGym = presensigym.value.find(item => item.id === id);
            if (updatedPresensiGym) {
            updatedPresensiGym.status = 'Hadir';
            }
            toast.success('Presensi Gym status updated successfully');
        } catch (error) {
            toast.error('Failed to update presensi gym status');
            console.log(error);
        } finally {
            this.showDialog = false;
        }
        };

        return {
            presensigym,
            formatDate,
            generatePresensi,
            confirmStatus
        }
    }
}
</script>
<style>
    .custom-text-field-width {
        width: 500px; /* example width */
    }
</style>

<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">LIST JADWAL HARIAN</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- :disabled="disableButton" -->
                        <!-- :disabled = "disableButton" -->
                        <button class="btn btn-md btn-success mb-4" @click="generateSchedule" >Generate Auto Schedule</button>
                        <v-text-field v-model="searchText" prepend-inner-icon="mdi-magnify" label="Cari Kelas" placeholder="Enter Class Name" class="custom-text-field-width"></v-text-field>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <!-- <th scope="col">ID</th> -->
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(jadwalharian, id) in filteredJadwalHarian" :key="id" class="text-center">
                                    <!-- <td>{{ jadwalharian.id }}</td> -->
                                    <td>{{ formatDate(jadwalharian.tanggal_kelas) }}</td>
                                    <td>{{ jadwalharian.nama }}</td>
                                    <td>{{ jadwalharian.nama_kelas }}</td>
                                    <td>{{ jadwalharian.status_kelas }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'mo.jadwalharian.edit', params: { 
                                            id: jadwalharian.id,
                                            }}" 
                                        class="btn btn-sm btn-primary mr-1"><v-icon size="15">mdi-pencil</v-icon>EDIT</router-link>
                                        &nbsp; -->
                                        <button class="btn btn-sm btn-primary mr-1" @click="editStatus(jadwalharian)">Ubah Status</button>
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
import { useToast } from "vue-toastification";
import { onMounted, ref,computed } from 'vue'
// import { onMounted, ref } from 'vue'
export default {
    setup() {
        const jadwalharian = ref([])

        const isScheduleGenerated = ref(false)

        let toast = useToast();
        // const token = localStorage.getItem('token')

        const searchText = ref('');
        const filteredJadwalHarian = computed(() => {
            return jadwalharian.value.filter(jadwalharian => {
                return jadwalharian.nama_kelas.toLowerCase().includes(searchText.value.toLowerCase())
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

        const editStatus = async (jadwalharian) => {
            const newStatus = 'Libur'; // set the new status to 'libur'
            jadwalharian.status_kelas = newStatus; // update the status of the corresponding jadwalharian object
            try {
                const response = await axios.put(`http://192.168.100.111/p3l/gopit_backend/public/jadwalharian/${jadwalharian.id}`, { status_kelas: newStatus });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }


        const generateSchedule = async () => {
            try {

                if (jadwalharian.value.length > 0) {
                    console.log('Schedule already generated')
                    toast.error('The Schedule already generated')
                    return
                }
                const response = await axios.post('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
                jadwalharian.value = response.data.jadwalharian
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }

        // const deleteResponseData = ref(null)

        // const generateSchedule = async () => {
        //     try {
        //         const response = await axios.post('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
        //         jadwalharian.value = response.data.jadwalharian
        //         window.location.reload();

        //         // Set a timeout to delete the schedule after one week
        //         const oneWeek = 7 * 24 * 60 * 60 * 1000 // One week in milliseconds
        //         const deleteDate = new Date().getTime() + oneWeek // Calculate the delete date by adding one week to today's date
        //         setTimeout(async () => {
        //         try {
        //             const deleteResponse = await axios.delete('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
        //             deleteResponseData.value = deleteResponse.data
        //             console.log('Schedule deleted:', deleteResponse.data)
        //         } catch (error) {
        //             console.log(error)
        //         }
        //         }, deleteDate - new Date().getTime()) // Set the timeout to trigger at the delete date
        //         console.log(response.data.jadwalharian)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }

    //     const generateSchedule = async () => {
    //   try {
    //     isScheduleGenerated.value = true // set isScheduleGenerated to true
    //     const response = await axios.post('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
    //     jadwalharian.value = response.data.jadwalharian
    //     isScheduleGenerated.value = false // set isScheduleGenerated to false after the response is received

    //     // Set a timeout to delete the schedule after one week
    //     const oneWeek = 7 * 24 * 60 * 60 * 1000 // One week in milliseconds
    //     const deleteDate = new Date().getTime() + oneWeek // Calculate the delete date by adding one week to today's date
    //     setTimeout(async () => {
    //       try {
    //         const deleteResponse = await axios.delete('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
    //         deleteResponseData.value = deleteResponse.data
    //         console.log('Schedule deleted:', deleteResponse.data)
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     }, deleteDate - new Date().getTime()) // Set the timeout to trigger at the delete date
    //   } catch (error) {
    //     console.log(error);
    //     toast({
    //       title: 'Error',
    //       description: 'Failed to generate schedule. Please try again later.',
    //       status: 'error',
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //   }
    // }


    const disableButton = computed(() => {
      return isScheduleGenerated.value;
    })


        // const handleClick = () => {
        // if (isScheduleGenerated.value) {
        //     toast.warning('The Schedule already generated')
        // } else {
        //     generateSchedule()
        // }
        // }


    onMounted(async () => {
      const response = await axios.get('http://192.168.100.111/p3l/gopit_backend/public/jadwalharian')
      jadwalharian.value = response.data.data
      console.log(response.data.data)
      isScheduleGenerated.value = response.data.isScheduleGenerated // update isScheduleGenerated value when component is mounted
    })
        
        return {
            jadwalharian,
            generateSchedule,
            formatDate,
            filteredJadwalHarian,
            searchText,
            // handleClick,
            disableButton,
            editStatus

        }
    }
}
</script>
<style>
    .custom-text-field-width {
        width: 500px; /* example width */
    }
</style>

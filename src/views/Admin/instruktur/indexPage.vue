<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST INSTRUKTUR</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'admin.instruktur.create' }" class="btn btn-md btn-success mb-4">Tambah Instruktur</router-link>
                        <v-text-field v-model="searchText" prepend-inner-icon="mdi-magnify" label="Cari Nama Member" placeholder="Enter Member Name" class="custom-text-field-width"></v-text-field>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">UMUR</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(instruktur, id_instruktur) in filteredInstruktur" :key="id_instruktur" class="text-center">
                                    <td>{{ instruktur.nama }}</td>
                                    <td>{{ instruktur.email }}</td>
                                    <td>{{ instruktur.umur }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'admin.instruktur.edit', params: { 
                                            id_instruktur: instruktur.id_instruktur,
                                            email: instruktur.email,
                                            password: instruktur.password
                                            } }" 
                                        class="btn btn-sm btn-primary mr-1"><v-icon size="15">mdi-pencil</v-icon>EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger ml-1"><v-icon size="15">mdi-trash-can-outline</v-icon>DELETE</button>
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
import { onMounted, ref,computed } from 'vue'
import { useToast } from "vue-toastification";
export default {
    setup() {
        const instruktur = ref([])

        // const token = localStorage.getItem('token')
        
        let toast = useToast();
        const searchText = ref('');
        const filteredInstruktur = computed(() => {
            return instruktur.value.filter(instruktur => {
                return instruktur.nama.toLowerCase().includes(searchText.value.toLowerCase())
            })
        })

        
        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://192.168.100.111/p3l/gopit_backend/public/instruktur')
            .then(response => {
                instruktur.value = response.data.data
                console.log('response', instruktur.value);
            }).catch(error => {
                console.log(error.response.data.data);
            })

            
        })
        //method delete
        function instrukturDelete(id_instruktur) {

            axios.delete(`http://192.168.100.111/p3l/gopit_backend/public/instruktur/${id_instruktur}`)
            .then(() => {
            instruktur.value.splice(instruktur.value.indexOf(id_instruktur));
            localStorage.setItem("showToast", "true"); // Set flag to show toast
            window.location.reload();
            }).catch(error => {
                console.log(error.response.data);
            })
        }
        // Check for the flag and show the toastification if it's set
        if (localStorage.getItem("showToast")) {
            toast.error("Berhasil Hapus Instruktur !",{
                timeout: 2000
            });
            localStorage.removeItem("showToast"); // Remove the flag
        }
        
        return {
            instruktur,
            instrukturDelete,
            filteredInstruktur,
            searchText
        }
    }
}
</script>
<style>
    .custom-text-field-width {
        width: 500px; /* example width */
    }
</style>

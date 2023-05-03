<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST ULASAN</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'user.ulasan.create' }" class="btn btn-md btn-success mb-4">TAMBAH
                            ULASAN</router-link>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">ULASAN</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ulasan, id) in ulasans" :key="id" class="text-center">
                                    <td>{{ ulasan.isi }}</td>
                                    <td v-if="ulasan.status=='1'">Sudah Dikonfirmasi</td>
                                    <td v-else>Belum Dikonfirmasi</td>
                                    <td v-if="ulasan.status=='0'" class="text-center">
                                        <router-link :to="{ name: 'user.ulasan.edit', params: { id: ulasan.id } }" 
                                        class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="ulasanDelete(ulasan.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                    <td v-if="ulasan.status=='1'" class="text-center">
                                        <router-link :to="{ name: 'user.ulasan.edit', params: { id: ulasan.id } }" 
                                        class="btn btn-sm btn-primary mr-1 disabled">EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="ulasanDelete(ulasan.id)" class="btn btn-sm btn-danger ml-1 disabled">DELETE</button>
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
import { onMounted, ref } from 'vue'
    import { useToast } from "vue-toastification";
export default {
    setup() {
        let ulasans = ref([])

        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        
        const toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://localhost:8000/api/ulasanByIdUser/' + id)
            .then(response => {
                ulasans.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        //method delete
        function ulasanDelete(id) {
            axios.delete(`http://localhost:8000/api/ulasan/${id}`)
            .then(() => {
                toast.error("Berhasil Hapus Data !",{
                            timeout: 2000
                        })
                ulasans.value.splice(ulasans.value.indexOf(id), 1);
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        return {
            ulasans,
            ulasanDelete
        }
    }
}
</script>
<style>

</style>
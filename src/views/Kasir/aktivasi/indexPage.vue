<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST MEMBER</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- <router-link :to="{ name: 'kasir.member.create' }" class="btn btn-md btn-success mb-4">New Member</router-link> -->
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">HARGA</th>
                                    <th scope="col">NAMA PEGAWAI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(aktivasi, id) in aktivasi" :key="id" class="text-center">
                                    <td>{{ aktivasi.nama_member }}</td>
                                    <td>{{ aktivasi.tanggal }}</td>
                                    <td>{{ aktivasi.harga }}</td>
                                    <td>{{ aktivasi.nama }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'kasir.struk.view', params: {
                                                id: aktivasi.id,
                                                tanggal: aktivasi.tanggal
                                            }}" 
                                            class="btn btn-sm btn-success ml-1 custom-btn">Member Card</router-link>
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
// import { onMounted, ref, computed } from 'vue'
import { onMounted, ref } from 'vue'
// import { useToast } from "vue-toastification";
export default {
    setup() {
        let aktivasi = ref([])

        // const token = localStorage.getItem('token')
        
        // let toast = useToast();

        // const searchText = ref('');

        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://192.168.100.111/p3l/gopit_backend/public/aktivasi')
            .then(response => {
                aktivasi.value = response.data.data
                console.log('response', aktivasi.value);
            }).catch(error => {
                console.log(error.response.data.data);
            })

            
        })
        
        // const formatMemberId = (id_member, Tanggal_Daftar) => {
        //     const date = new Date(Tanggal_Daftar);
        //     const year = date.getFullYear().toString().slice(-2);
        //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
        //     const id = id_member.toString().padStart(2, '0');
        //     return `${year}.${month}.${id}`;
        // };
        //method delete
        // function aktivasiDelete(id) {
        //     axios.delete(`http://192.168.100.111/p3l/gopit_backend/public/aktivasi/${id}`)
        //     .then(() => {
        //                 toast.error("Berhasil Hapus Member !",{
        //                     timeout: 2000
        //                 })
        //                 aktivasi.value.splice(aktivasi.value.indexOf(id_member), 1);
        //         localStorage.setItem("showToast", "true"); // Set flag to show toast
        //         window.location.reload();
        //     }).catch(error => {
        //         console.log(error.response.data)
        //     })
        // }
        // Check for the flag and show the toastification if it's set
        // if (localStorage.getItem("showToast")) {
        //     toast.error("Berhasil Hapus Member !",{
        //         timeout: 2000
        //     });
        //     localStorage.removeItem("showToast"); // Remove the flag
        // }

        

        return {
            aktivasi,
            // MemberDelete,
            // filteredMember,
            // searchText,
            // formatMemberId
        }
    }
}
</script>
<style>
    .custom-text-field-width {
  width: 500px; /* example width */
}

.custom-btn {
  font-size: 12px;
  padding: 5px 5px;
}
</style>
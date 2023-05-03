<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
       <h1 class="h2">LIST TRANSAKSI</h1>
   </div>
   <div class="container mt-5">
       <div class="row">
           <div class="col-md-12">
               <div class="card border-0 rounded shadow">
                   <div class="card-body">
                       <table class="table table-striped table-bordered mt4">
                           <thead class="thead-dark">
                               <tr class="text-center">
                                   <th scope="col">NAMA BARANG</th>
                                   <th scope="col">JENIS</th>
                                   <th scope="col">KETERSEDIAAN</th>
                                   <th scope="col">HARGA</th>
                                   <th scope="col">JUMLAH</th>
                                   <th scope="col">TOTAL HARGA</th>
                                   <th scope="col">STATUS</th>
                                   <th class="text-center" scope="col" colspan="2">AKSI</th>
                               </tr>
                           </thead>
                           <tbody>
                               <tr v-for="(transaksi, id) in transaksis" :key="id" class="text-center">
                                   <td>{{ transaksi.product.nama_barang }}</td>
                                   <td>{{ transaksi.product.jenis }}</td>
                                   <td v-if="transaksi.product.ketersediaan == 0">Kosong</td>
                                   <td v-else>Tersedia</td>
                                   <td>{{ transaksi.product.harga }}</td>
                                   <td>{{ transaksi.jumlah }}</td>
                                   <td>{{ transaksi.jumlah * transaksi.product.harga }}</td>
                                   <td v-if="transaksi.status == 0">Belum Bayar</td>
                                   <td v-else-if="transaksi.status == 1">Sudah Dibayar</td>
                                   <td v-if="transaksi.status == 0" class="text-center">
                                       <router-link :to="{ name: 'user.transaksi.edit', params: { id: transaksi.id } }" 
                                       class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        &nbsp;
                                       <button class="btn btn-sm btn-danger ml-1" @click="deleteTransaksi(transaksi.id)">DELETE</button>  
                                   </td>
                                   <td v-else-if="transaksi.status == 1" class="text-center">
                                    <router-link :to="{ name: 'user.transaksi.edit', params: { id: transaksi.id } }" 
                                       class="btn btn-sm btn-primary mr-1 disabled">EDIT</router-link>
                                        &nbsp;
                                       <button class="btn btn-sm btn-danger ml-1" @click="deleteTransaksi(transaksi.id)" disabled>DELETE</button>  
                                   </td>
                                   <td v-if="transaksi.product.ketersediaan == 0" class="text-center">
                                       <button class="btn btn-md btn-success ml-1" @click="bayarTransaksi(transaksi.id)" disabled>PAY</button>  
                                   </td>
                                   <td v-else-if="transaksi.status == 1" class="text-center">
                                       <button class="btn btn-md btn-success ml-1" @click="bayarTransaksi(transaksi.id)" disabled>PAY</button>  
                                   </td>
                                   <td v-else class="text-center">
                                       <button class="btn btn-md btn-success ml-1" @click="bayarTransaksi(transaksi.id)" >PAY</button>  
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
import { useRouter} from 'vue-router'
import { useToast } from "vue-toastification";
export default {
   setup() {

         //state departemen
        let transaksis = ref([])

        const router = useRouter()
        const token = localStorage.getItem('token')    
        const id_user = localStorage.getItem('id')
            
        let toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}  
            axios.get(`http://localhost:8000/api/transaksiByIdUser/${id_user}`)
                .then(response => {
                    transaksis.value = response.data.data
                }).catch(error => {
                    console.log(error.response.data)
            })
        })


        function deleteTransaksi(id) {
            //delete data post by ID
            axios.delete(`http://localhost:8000/api/transaksi/${id}`).then(() => {   
                        toast.error("Berhasil Hapus Data !",{
                            timeout: 2000
                        })       
                transaksis.value.splice(transaksis.value.indexOf(id), 1);

                router.push({
                    name: 'user.transaksi.index'
                })
                }).catch(error => {
                    console.log(error.response.data)
                }) 
            }

        function bayarTransaksi(id) {
            //delete data post by ID
            axios.put(`http://localhost:8000/api/transaksiConfirm/${id}`, {
                    status: 1
            }).then(() => {
                        toast.success("Berhasil Melakukan Transaksi !",{
                            timeout: 2000
                        })
            //redirect ke post index
                router.push({
                    name: 'user.transaksi.index'
                })
            }).catch(error => {
                //assign state validation with error 
                console.log(error.response.data)
            })
        }

        return {
            transaksis,
            deleteTransaksi,
            bayarTransaksi
        }
   }
}
</script>
<style>

</style>
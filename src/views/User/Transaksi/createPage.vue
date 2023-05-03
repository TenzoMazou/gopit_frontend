<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TRANSAKSI</h4>
                        <hr>
                        <form @submit.prevent="store">
                             <div class="form-group mb-3">
                                <label class="form-label">Nama Produk</label>
                                <input type="text" class="form-control" v-model="transaksi.nama_produk" placeholder="Nama Produk" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis</label>
                                <input class="form-control" v-model="transaksi.jenis" placeholder="Jenis" disabled>
                                <!-- validation -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Harga</label>
                                <input class="form-control" v-model="transaksi.harga" placeholder="Harga" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah</label>
                                <input type="number" class="form-control" v-model="transaksi.jumlah" placeholder="Jumlah">
                                <!-- validation -->
                                <div v-if="validation.jumlah" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">ADD TO CHART</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { onMounted,reactive, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state departemen
            const transaksi = reactive({
            nama_produk: '',
            jenis: '',
            harga: '',
            jumlah : 0,
            })

            //state validation
            const validation = ref([])

            //vue router
            const router = useRouter()

            const token = localStorage.getItem('token')

            const id_user = localStorage.getItem('id')
            
            let toast = useToast();

            //vue router
            const route = useRoute()

            onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}    
            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/product/${route.params.id}`)
            .then(response => {
            //assign state departemen with response data
                transaksi.nama_produk = response.data.data.nama_barang
                transaksi.jenis = response.data.data.jenis
                transaksi.harga = response.data.data.harga
            }).catch(error => {
                console.log(error.response.data)
            })

            })

            function store() {
            let jumlah = transaksi.jumlah
            let id_produk = route.params.id 
            axios.post(`http://localhost:8000/api/transaksi`, {
                id_user : id_user,
                id_product : id_produk,
                jumlah : jumlah,
                status : 0, 
            }).then(() => {
                        toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
            //redirect ke post index
                router.push({
                    name: 'user.transaksi.index'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
             }
            //return
            return {
                transaksi,
                validation,
                router,
                store
            }
        }
    }
</script>
<style>
</style>
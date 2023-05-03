<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT TRANSAKSI</h4>
                        <hr>
                        <form @submit.prevent="update">
                             <div class="form-group mb-3">
                                <label class="form-label">Nama Produk</label>
                                <input type="text" class="form-control" v-model="product.nama_produk" placeholder="Nama Produk" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis</label>
                                <input class="form-control" v-model="product.jenis" placeholder="Jenis" disabled>
                                <!-- validation -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Harga</label>
                                <input class="form-control" v-model="product.harga" placeholder="Harga" disabled>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah</label>
                                <input type="number" class="form-control" v-model="product.jumlah" placeholder="Jumlah">
                                <!-- validation -->
                                <div v-if="validation.jumlah" class="mt-2 alert alert-danger">
                                    {{ validation.jumlah[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">UPDATE</button>
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
            const transaksis = reactive({
            id_produk: '',    
            id_user: '',
            jumlah : 0,
            status: 0,
            })

            const product = reactive({
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
            
            //vue router
            const route = useRoute()
            
            let toast = useToast();

            onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}      
            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/transaksi/${route.params.id}`)
            .then(response => {
            //assign state departemen with response data
                product.nama_produk = response.data.data.product.nama_barang
                product.jenis = response.data.data.product.jenis
                product.harga = response.data.data.product.harga
                product.jumlah = response.data.data.jumlah
                transaksis.id_produk = response.data.data.id_product
            }).catch(error => {
                console.log(error.response.data)
            })

            })


            function update() {
            let jumlah = product.jumlah
            let id_produk = transaksis.id_produk
            axios.put(`http://localhost:8000/api/transaksi/${route.params.id}`, {
                id_user : id_user,
                id_product : id_produk,
                jumlah : jumlah,
                status: 0
            }).then(() => {
                        toast.success("Berhasil Edit Data !",{
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
                product,
                transaksis,
                validation,
                router,
                update
            }
        }
    }
</script>
<style>
</style>
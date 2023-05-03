<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST PRODUK</h1>
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
                                    <th scope="col">HARGA</th>
                                    <th scope="col">KETERSEDIAAN</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, id) in products" :key="id" class="text-center">
                                    <td>{{ product.nama_barang }}</td>
                                    <td>{{ product.jenis }}</td>
                                    <td>{{ product.harga }}</td>
                                    <td v-if="product.ketersediaan=='1'">Tersedia</td>
                                    <td v-else>Kosong</td>
                                    <td v-if="product.ketersediaan=='1'" class="text-center">
                                        <router-link :to="{ name: 'user.transaksi.create', params: { id: product.id } }" 
                                        class="btn btn-sm btn-success mr-1">ADD TO CART</router-link>
                                    </td>
                                    <td v-if="product.ketersediaan=='0'" class="text-center">
                                        <router-link :to="{ name: 'user.transaksi.create', params: { id: product.id } }" 
                                        class="btn btn-sm btn-success mr-1 disabled">ADD TO CART</router-link>
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
export default {
    setup() {
        let products = ref([])

        const token = localStorage.getItem('token')

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://localhost:8000/api/product')
            .then(response => {
                products.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })

            
        })

        return {
            products,
        }
    }
}
</script>
<style>

</style>
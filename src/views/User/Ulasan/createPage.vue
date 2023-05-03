<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH ULASAN</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Ulasan Anda</label>
                                <textarea size="lg" type="text" class="form-control" v-model="ulasan.isi" placeholder="Masukkan Ulasan anda disini"></textarea>
                                <!-- validation -->
                                <div v-if="validation.isi" class="mt-2 alert alert-danger">
                                    {{
                                            validation.isi[0]
                                    }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
    import { useToast } from "vue-toastification";
export default {
    setup() {
        //state departemen
        const ulasan = reactive({
            isi : '',
            id_user : '',
            status : '',
        })
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        
        const toast = useToast();

        onMounted(() => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        })

        //method store
        function store() {
            let isi = ulasan.isi
            axios.post('http://localhost:8000/api/ulasanByIdUser', {
                isi: isi,
                id_user: id,
                status: 0
            }).then(() => {
                
                toast.success("Berhasil Tambah Data !",{
                            timeout: 2000
                        })
                //redirect ke post index
                router.push({
                    name: 'user.ulasan.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            ulasan,
            validation,
            router,
            store
        }
    }
}
</script>
<style>

</style>

<!-- ulasan -->
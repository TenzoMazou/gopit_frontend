<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH ULASAN</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Ulasan Anda</label>
                                <textarea size="lg" type="text" class="form-control" v-model="ulasan.isi"
                                    placeholder="Masukkan Ulasan anda disini"></textarea>
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
    import { reactive, ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";

    export default {
        setup() {
            //state ulasan
            const ulasan = reactive({
                isi: "",
                id_user: "",
                status: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            const route = useRoute();

            onMounted(() => {
                //get API from Laravel Backend
                axios
                    .get("http://localhost:8000/api/ulasan/" + route.params.id , )
                    .then(response => {
                        //assign state posts with response data
                        ulasan.isi = response.data.data.isi
                        ulasan.id_user = response.data.data.id_user
                        ulasan.status = response.data.data.status
                    }).catch(error => {
                        console.log(error.response.data)
                    })
            })

            //method update
            function update() {
                let isi = ulasan.isi;
                let id_user = ulasan.id_user;
                let status = ulasan.status;

                let toast = useToast();
                axios
                    .put("http://localhost:8000/api/ulasan/" + route.params.id, {
                        isi: isi,
                        id_user: id_user,
                        status: status
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Data !", {
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "user.ulasan.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                ulasan,
                validation,
                router,
                update,
            };
        },
    };
</script>

<style>

</style>
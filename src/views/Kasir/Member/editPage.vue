<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT MEMBER</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <!-- <input type="text" class="form-control" v-model="member.nama_member"
                                    placeholder="Masukkan nama member" /> -->
                                <v-text-field label="Masukan nama Member" variant="solo" v-model="member.nama_member" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <!-- <input type="text" class="form-control" v-model="member.email"
                                    placeholder="Masukkan email" /> -->
                                <v-text-field label="Masukan Email" variant="solo" v-model="member.email" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Status</label>
                                <!-- <input type="text" class="form-control" v-model="member.status"
                                    placeholder="Masukkan Status" /> -->
                                <!-- <v-text-field label="Masukan Status" variant="solo" v-model="member.status" class="custom-text-field-height"></v-text-field> -->
                                <v-select v-model="member.status"
                                    label="Masukan Status"
                                    :items="['Aktif', 'Tidak Aktif']"
                                    variant="solo"
                                    class="custom-text-field-height"
                                ></v-select>
                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.umur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Umur</label>
                                <!-- <input type="text" class="form-control" v-model="member.umur"
                                    placeholder="Masukkan umur" /> -->
                                <v-text-field type="text" label="Masukan Umur" variant="solo" v-model="member.umur" 
                                    class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.umur" class="mt-2 alert alert-danger">
                                    {{ validation.umur[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Deposit Uang</label>
                                <!-- <input type="number" class="form-control" v-model="member.deposit_uang"
                                    placeholder="Masukkan Deposit Uang" /> -->
                                <v-text-field type="number" label="Masukan Deposit Uang" variant="solo" v-model="member.deposit_uang" 
                                    class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.deposit_uang" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_uang[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Deposit Kelas</label>
                                <!-- <input type="number" class="form-control" v-model="member.deposit_kelas"
                                    placeholder="Masukkan Deposit Kelas" /> -->
                                <v-text-field type="number" label="Masukan Deposit Kelas" variant="solo" v-model="member.deposit_kelas" 
                                    class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.deposit_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="member.Tanggal_lahir"
                                    placeholder="Masukkan tanggal lahir" />
                                <!-- validation -->
                                <div v-if="validation.Tanggal_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tanggal_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Expiration Date</label>
                                <input type="date" class="form-control" v-model="member.Expired_Date"
                                    placeholder="Masukkan Expired Date" />
                                <!-- validation -->
                                <div v-if="validation.Expired_Date" class="mt-2 alert alert-danger">
                                    {{ validation.Expired_Date[0] }}
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
    import { useRouter, useRoute } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state product
            const member = reactive({
                nama_member: "",
                umur: "",
                Tanggal_lahir: "",
                email: "",
                deposit_uang: "",
                deposit_kelas: "",
                Expired_Date: "",
                status: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //params id
            const route = useRoute();
            const id_member = route.params.id_member
            const Tanggal_lahir = route.params.Tanggal_lahir

            // const token = localStorage.getItem('token')

            onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            //get API from Laravel Backend
            axios
                .get(`http://192.168.100.111/p3l/gopit_backend/public/member/${id_member}/${Tanggal_lahir}`,)
                .then(response => {
                    //assign state posts with response data
                    member.nama_member = response.data.data.nama_member
                    member.umur = response.data.data.umur
                    member.Tanggal_lahir = response.data.data.Tanggal_lahir
                    member.email = response.data.data.email
                    member.deposit_uang = response.data.data.deposit_uang
                    member.deposit_kelas = response.data.data.deposit_kelas
                    member.Expired_Date = response.data.data.Expired_Date
                    member.status = response.data.data.status
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let nama_member = member.nama_member;
                let umur = member.umur;
                let Tanggal_lahir = member.Tanggal_lahir;
                let email = member.email;
                let deposit_uang = member.deposit_uang;
                let deposit_kelas = member.deposit_kelas;
                let Expired_Date = member.Expired_Date;
                let status = member.status;

                let toast = useToast();

                axios
                    .put(`http://192.168.100.111/p3l/gopit_backend/public/member/${route.params.id_member}/${route.params.Tanggal_lahir}`, {
                        nama_member: nama_member,
                        umur: umur,
                        Tanggal_lahir: Tanggal_lahir,
                        email: email,
                        deposit_uang: deposit_uang,
                        deposit_kelas: deposit_kelas,
                        Expired_Date: Expired_Date,
                        status: status,
                    })
                    .then(() => {
                        toast.success("Berhasil Edit Member !",{
                            timeout: 2000
                        })
                        //redirect ke post index
                        router.push({
                            name: "kasir.member.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        validation.value = error.response.data;
                    });
            }
            //return
            return {
                member,
                validation,
                router,
                update,
            };
        },
    };
</script>
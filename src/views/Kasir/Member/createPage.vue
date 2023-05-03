<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>NEW MEMBER</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <!-- <input type="text" class="form-control" v-model="member.nama_member"
                                    placeholder="Masukkan nama member" /> -->
                                <v-text-field label="Masukan nama Member" variant="solo" v-model="member.nama_member" class="custom-text-field-height"></v-text-field>
                                <!-- validation -->
                                <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                    {{ validation.nama_member[0] }}
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
                                    {{ validation.status[0] }}
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
                                    {{ validation.Tanggal_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Pendaftaran</label>
                                <input type="date" class="form-control" v-model="member.Tanggal_Daftar"
                                    placeholder="Masukkan Tanggal Pendaftaran" />
                                <!-- validation -->
                                <div v-if="validation.Tanggal_Daftar" class="mt-2 alert alert-danger">
                                    {{ validation.Tanggal_Daftar[0] }}
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
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state member
            const member = reactive({
                nama_member: "",
                umur: "",
                Tanggal_lahir: "",
                email: "",
                deposit_uang: "",
                deposit_kelas: "",
                Expired_Date: "",
                Tanggal_Daftar: "",
                status: "",
            });
            //state validation
            const validation = ref([]);
            //vue router
            const router = useRouter();
            //method store
            function store() {
                validation.value = [];
                // let nama = instruktur.nama;
                // let umur = instruktur.umur;
                // let password = instruktur.password;
                let member = new FormData();
                member.append('nama_member', this.member.nama_member);
                member.append('umur', this.member.umur);
                member.append('Tanggal_lahir', this.member.Tanggal_lahir);
                member.append('email', this.member.email);
                member.append('deposit_uang', this.member.deposit_uang);
                member.append('deposit_kelas', this.member.deposit_kelas);
                member.append('Expired_Date', this.member.Expired_Date);
                member.append('Tanggal_Daftar', this.member.Tanggal_Daftar)
                member.append('status', this.member.status);
                let toast = useToast();

                if (!member.get("nama_member")) {
                    validation.value.nama_member = ["Nama member harus diisi"];
                }
                if (!member.get("umur")) {
                    validation.value.umur = ["Umur member harus diisi"];
                }
                if (!member.get("Tanggal_lahir")) {
                    validation.value.Tanggal_lahir = ["Tanggal Lahir harus diisi"];
                }
                if (!member.get("email")) {
                    validation.value.email = ["Email member harus diisi"];
                }
                if (!member.get("deposit_uang")) {
                    validation.value.deposit_uang = ["Deposit Uang member harus diisi"];
                }
                if (!member.get("deposit_kelas")) {
                    validation.value.deposit_kelas = ["Deposit Kelas member harus diisi"];
                }
                if (!member.get("Expired_Date")) {
                    validation.value.Expired_Date = ["Expired Date member harus diisi"];
                }
                if (!member.get("Tanggal_Daftar")) {
                    validation.value.Tanggal_Daftar = [" Tanggal Daftar member harus diisi"];
                }
                if (!member.get("status")) {
                    validation.value.status = ["status harus diisi"];
                }

                // If there are any error messages, prevent the form from being submitted and show the error messages to the user
                if (Object.keys(validation.value).length > 0) {
                    return;
                }

                // const token = localStorage.getItem('token')
                // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post("http://192.168.100.111/p3l/gopit_backend/public/member", member)
                .then(() => {
                    toast.success("Berhasil Register Member !",{
                            timeout: 2000
                        })
                    router.push({
                            name: "kasir.member.index",
                        });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        console.log('tanggal expired date', this.member.Expired_Date)
                        console.log(error.response.data.data);
                        validation.value = error.response.data
                    });
            }
            //return
            return {
                member,
                validation,
                router,
                store,
            };
        },
    };

</script>
<style>
    .custom-text-field-height {
        height: 55px;
    }
</style>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="deposituang.nama_member" autocomplete="off" placeholder="Masukkan Nama Member" />
                                <!-- validation -->
                                <div v-if="validation.nama_member" class="mt-2 alert alert-danger">
                                    {{ validation.nama_member[0] }}
                                </div>
                                <!-- dropdown list -->
                                <div class="dropdown mt-1">
                                    <ul class="dropdown-menu w-100" v-show="memberMatches.length > 0">
                                        <li v-for="(member, index) in memberMatches" :key="index" @click="deposituang.nama_member = member">{{ member }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Transaksi</label>
                                <input type="date" class="form-control" v-model="deposituang.Tanggal"
                                    placeholder="Masukkan Tanggal Transaksi" />
                                <!-- validation -->
                                <div v-if="validation.Tanggal" class="mt-2 alert alert-danger">
                                    {{ validation.Tanggal[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Kasir</label>
                                <input type="date" class="form-control" v-model="deposituang.nama"
                                    placeholder="Masukkan Kasir" />
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nominal Deposit Uang</label>
                                <input type="number" class="form-control" v-model="deposituang.nominal"
                                    placeholder="Masukkan Nominal Deposit Uang" />
                                <!-- validation -->
                                <div v-if="validation.nominal" class="mt-2 alert alert-danger">
                                    {{ validation.nominal[0] }}
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
    import jsPDF from 'jspdf';
    import { reactive, ref, onMounted, watch } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import { useToast } from "vue-toastification";
    export default {
        setup() {
            //state instruktur
            const deposituang = reactive({
                nama_member: "",
                nominal: "",
                Tanggal: "",
                nama: "",
            });
            //state validation
            const validation = ref([]);

            // let member = ref([])
            const memberList = ref([]);
            const memberMatches = ref([]);


            onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get('http://192.168.100.111/p3l/gopit_backend/public/member')
                .then(response => {
                    memberList.value = response.data.data.map(member => member.nama);
                })
                .catch(error => {
                    console.log(error.response.data.data);
                });
            })

            
            watch(deposituang.nama_member, function(newVal) {
                if (newVal.length >= 2) {
                    let matches = memberList.value.filter(member => {
                        return member.toLowerCase().indexOf(newVal.toLowerCase()) >= 0;
                    });
                    memberMatches.value = matches.slice(0, 10);
                } else {
                    memberMatches.value = [];
                }
            });
            // const insOptions = ref([]);
            //vue router
            const router = useRouter();

            function generatePDF() {
                const doc = new jsPDF();
                const filename = `struk_deposituang_${deposituang.nama_member}.pdf`;

                // Tambahkan konten struk ke dalam dokumen PDF
                doc.fontSize(16).text(`Struk Pembayaran Deposit Uang`, { align: 'center' });
                doc.fontSize(12).text(`Nama Member: ${deposituang.nama_member}`);
                doc.fontSize(12).text(`Tanggal Transaksi: ${deposituang.Tanggal}`);
                doc.fontSize(12).text(`Nama Kasir: ${deposituang.nama}`);
                doc.fontSize(12).text(`Nominal Deposit Uang: ${deposituang.nominal}`);

                doc.end();

                return filename;
            }

            //method store
            function store(){
                let deposituang = new FormData();
                deposituang.append('nama_member', this.deposituang.nama_member);
                deposituang.append('nominal', this.deposituang.nominal);
                deposituang.append('Tanggal', this.deposituang.Tanggal);
                deposituang.append('nama', this.deposituang.nama);

                let toast = useToast();

                // const token = localStorage.getItem('token')
                // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post("http://192.168.100.111/p3l/gopit_backend/public/jadwalumum", deposituang)
                .then(() => {
                    // const filename = generatePDF();
                    toast.success("Berhasil Melakukan Transaksi Deposit Uang !",{
                            timeout: 2000
                        })
                    // router.push({
                    //         name: "mo.jadwalumum.index",
                    //     });
                    })
                    .catch((error) => {
                        //assign state validation with error
                        console.log(error.response.data.data);
                        validation.value = error.response.data
                    });
            }

            // function loadinsOptions(){
            //     // fetch data from instruktur database
            //     axios.get('http://192.168.100.111/p3l/gopit_backend/public/instruktur')
            //         .then(response => {
            //             // map response data to an array of options
            //             insOptions.value = response.data.data.map((instruktur) => {
            //                 return {
            //                     id_instruktur: instruktur.id_instruktur,
            //                     nama: instruktur.nama
            //                 };
            //             });
            //         })
            //         .catch(error => {
            //             console.error(error);
            //         });
            //     }
            //return

            // loadinsOptions();
            
            return {
                deposituang,
                validation,
                router,
                // insOptions,
                // loadinsOptions,
                store,
                generatePDF,
                memberList,
                memberMatches,
            };
        },
    };

</script>
<style>

</style>

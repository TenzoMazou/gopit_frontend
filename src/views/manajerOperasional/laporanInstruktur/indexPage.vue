<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">LAPORAN KINERJA INSTRUKTUR</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <th scope="rowgroup">LAPORAN KINERJA INSTRUKTUR</th>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">NAMA INSTRUKTUR</th>
                                    <th scope="col">JUMLAH HADIR</th>
                                    <th scope="col">JUMLAH LIBUR</th>
                                    <th scope="col">WAKTU TERLAMBAT</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(laporanInstruktur, id) in laporanInstruktur" :key="id" class="text-center">
                                    <td>{{ laporanInstruktur.nama_instruktur }}</td>
                                    <td>{{ laporanInstruktur.jumlah_hadir }}</td>
                                    <td>{{ laporanInstruktur.jumlah_libur }}</td>
                                    <td>{{ laporanInstruktur.waktu_terlambat }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-sm btn-success ml-1 custom-btn" @click="generatePDF">Cetak Laporan Gym</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
// import { useToast } from "vue-toastification";
export default {
    setup() {
        const laporanInstruktur = ref([])
        // const totalSum = ref(0)

        // const token = localStorage.getItem('token')
        
        // let toast = useToast();

        
        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://10.53.9.71/p3l/gopit_backend/public/laporanInstruktur')
            .then(response => {
                laporanInstruktur.value = response.data.data
                // totalSum.value = response.data.totalSum
                console.log('response', laporanInstruktur.value);
                // console.log('total', laporanPendapatan.total);
            }).catch(error => {
                console.log(error.response.data.data);
            })
        })


        const formatDate = computed(() => {
        return function(date) {
                const options = {   
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric' 
                                }
                return new Date(date).toLocaleDateString('id-ID', options)
            }
        })

        const generatePDF = () => {
            const doc = new jsPDF();
            const currentDate = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('id-ID', options);
            const period = currentDate.toLocaleDateString('en-US', { month: 'long'});
            const period2 = currentDate.toLocaleDateString('en-US', { year: 'numeric'});

            doc.setFontSize(12);
            doc.text('GoFit', 10, 10);
            doc.text('Jl. Qlipoth Tree No 5 Yogyakarta', 10, 16);
            doc.setFont('helvetica', 'bold');
            doc.text('LAPORAN AKTIVITAS KINERJA INSTRUKTUR', 10, 27);
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 29, 89, 29);
            doc.setFont('helvetica', 'normal');
            doc.text('BULAN : ' + period, 10, 34);
            doc.text('TAHUN : ' + period2, 60, 34);
            doc.text('Tanggal cetak: ' + formattedDate, 10, 40);

            // Add table header
            const headers = ['NAMA INSTRUKTUR', 'JUMLAH HADIR', 'JUMLAH LIBUR', 'WAKTU TERLAMBAT'];
            const tableData = [headers];

            // Add table rows
            laporanInstruktur.value.forEach((item) => {
                const row = [item.nama_instruktur, item.jumlah_hadir, item.jumlah_libur, item.waktu_terlambat];
                tableData.push(row);
            });

            // Set table dimensions and styles
            const tableTop = 50;
            const tableLeft = 10;
            const cellWidth = 40;
            const cellHeight = 10;
            const lineHeight = 7;

            // Generate table
            doc.autoTable({
                startY: tableTop,
                head: [tableData[0]],
                body: tableData.slice(1),
                margin: { left: tableLeft },
                styles: { fontSize: 10, cellWidth, cellHeight, lineHeight },
                columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 50 }, 2: {cellWidth: 50}, 3: {cellWidth:50} },
            });

            // Save the PDF
            doc.save('laporan_instruktur.pdf');
        };

        
        return {
            laporanInstruktur,
            formatDate,
            generatePDF
        }
    }
}
</script>
<style>
    .custom-text-field-width {
        width: 500px; /* example width */
    }
</style>

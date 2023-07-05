<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2" style="color: white;">LAPORAN PENDAPATAN</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">  
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <th scope="rowgroup">LAPORAN PENDAPATAN</th>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">BULAN</th>
                                    <th scope="col">DEPOSIT</th>
                                    <th scope="col">AKTIVASI</th>
                                    <th scope="col">TOTAL (/BULAN)</th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(laporanPendapatan, id) in laporanPendapatan" :key="id" class="text-center">
                                    <td>{{ laporanPendapatan.bulan }}</td>
                                    <td>{{ laporanPendapatan.Deposit }}</td>
                                    <td>{{ laporanPendapatan.Aktivasi }}</td>
                                    <td>Rp. {{ laporanPendapatan.total }}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-center"><strong>Total (/Tahun):</strong></td>
                                    <td class="text-center">Rp. {{ totalSum }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-sm btn-success ml-1 custom-btn" @click="generatePDF">Cetak Laporan Pendapatan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
// import { useToast } from "vue-toastification";
export default {
    setup() {
        const laporanPendapatan = ref([])
        const totalSum = ref(0)

        // const token = localStorage.getItem('token')
        
        // let toast = useToast();

        
        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://10.53.9.71/p3l/gopit_backend/public/laporanPendapatan')
            .then(response => {
                laporanPendapatan.value = response.data.data
                totalSum.value = response.data.totalSum
                console.log('response', laporanPendapatan.value);
                // console.log('total', laporanPendapatan.total);
            }).catch(error => {
                console.log(error.response.data.data);
            })

            
        })

        const generatePDF = () => {
            const doc = new jsPDF();
            const currentDate = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = currentDate.toLocaleDateString('id-ID', options);
            const period = currentDate.toLocaleDateString('en-US', { year: 'numeric' });

            doc.setFontSize(12);
            doc.text('GoFit', 10, 10);
            doc.text('Jl. Qlipoth Tree No 5 Yogyakarta', 10, 16);
            doc.setFont('helvetica', 'bold');
            doc.text('LAPORAN PENDAPATAN BULANAN', 10, 27);
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.line(10, 29, 89, 29);
            doc.setFont('helvetica', 'normal');
            doc.text('PERIODE: ' + period, 10, 34);
            doc.text('Tanggal cetak: ' + formattedDate, 10, 40);
            // Add table header
            const headers = ['BULAN', 'DEPOSIT', 'AKTIVASI', 'TOTAL (/BULAN)'];
            const tableData = [headers];

            // Add table rows
            laporanPendapatan.value.forEach((item) => {
                const row = [item.bulan, item.Deposit, item.Aktivasi, `Rp. ${item.total}`];
                tableData.push(row);
            });

            // Add total row
            const totalRow = ['', '', 'Total (/Tahun):', `Rp. ${totalSum.value}`];
            tableData.push(totalRow);

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
                columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 }, 3: { cellWidth: 40 } },
            });

            // Save the PDF
            doc.save('laporan_pendapatan.pdf');
        };

        
        return {
            laporanPendapatan,
            totalSum,
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

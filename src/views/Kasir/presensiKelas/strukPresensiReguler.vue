<template>
    <div class="card border" style="width: 50%;">
      <div class="card-body">
        <h5 class="card-title">GOFIT</h5>
        <p>Jl. Qlipoth Tree No 5 Yogyakarta</p>
        <h5 class="card-title">STRUK PRESENSI KELAS</h5>
        <p class="card-text" v-for="(presensikelas, index) in presensikelass" :key="index">
            <strong>No Struk : {{ formatStrukId(presensikelas.id, presensikelas.tanggal_booking) }}</strong><br>
            <strong>Tanggal : {{ formatTanggal(presensikelas.tanggal_booking) }}</strong> <br><br>
        <!-- <strong>ID MEMBER : {{ formatStrukId(presensigym.id_member, presensigym.Tanggal_Daftar) }}</strong><br> -->
          <strong>MEMBER  : {{ formatMemberId(presensikelas.id_member, presensikelas.Tanggal_Daftar) }} / {{ presensikelas.nama_member }}</strong> <br>
          <strong>Kelas : {{ presensikelas.nama_kelas }}</strong><br>
          <strong>Instruktur : {{ presensikelas.Nama_Instruktur }}</strong><br>
          <strong>Tarif  : {{ presensikelas.tarif }}</strong> <br>
          <strong>Sisa Deposit : {{ presensikelas.deposit_uang }}</strong>
        </p>
        <button @click="generatePDF" class="btn btn-sm btn-primary mr-1">Generate PDF</button>
      </div>
  </div>
</template>
    
    <script>
    import axios from "axios";
    import { reactive, onMounted } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import jsPDF from 'jspdf';
    
    export default {
      setup() {
        const generatePDF = () => {
          if (presensikelass.length > 0) {
            const doc = new jsPDF();
            const cardWidth = 100; // mm
            const cardHeight = 65; // mm
            const margin = 10; // mm
            const x = margin;
            const y = margin;
            const contentWidth = cardWidth + 2.5 * margin;
            const contentHeight = cardHeight + 1.5 * margin;

            // Draw border around card
            doc.rect(x, y, contentWidth, contentHeight);

            // Add content to card
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('GOFIT', 15, y + margin);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Jl. Qlipoth Tree No 5 Yogyakarta', 15, y + margin + 7);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('STRUK PRESENSI KELAS REGULER', 15, y + margin + 17);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

            const firstPresensikelas = presensikelass[0];

            doc.text('No Struk :', 15, y + margin + 27);
            doc.text(formatStrukId(firstPresensikelas.id, firstPresensikelas.tanggal_booking), 50, y + margin + 27);

            doc.text('Tanggal :', 15, y + margin + 33);
            doc.text(formatTanggal(firstPresensikelas.tanggal_booking), 50, y + margin + 33);

            doc.text('MEMBER :', 15, y + margin + 45);
            doc.text(formatMemberId(firstPresensikelas.id_member, firstPresensikelas.Tanggal_Daftar) + ' / ' + firstPresensikelas.nama_member, 50, y + margin + 45);

            doc.text('Kelas :', 15, y + margin + 50);
            doc.text(firstPresensikelas.nama_kelas, 50, y + margin + 50);

            doc.text('Instruktur :', 15, y + margin + 55);
            doc.text(firstPresensikelas.Nama_Instruktur, 50, y + margin + 55);

            doc.text('Tarif: ', 15, y + margin + 60);
            doc.text(firstPresensikelas.tarif, 50, y + margin + 60);

            doc.text('Sisa Deposit: ', 15, y + margin + 65);
            doc.text(firstPresensikelas.deposit_uang, 50, y + margin + 65);

            doc.autoPrint();
            doc.save('struk-presensi-kelas-reguler.pdf');
          }
        };

        const presensikelass = reactive([]);
        const router = useRouter();
        const route = useRoute();
        const id = route.params.id;
    
        onMounted(() => {
          axios
            .get(
              `http://192.168.100.111/p3l/gopit_backend/public/presensikelas/${id}`
            )
            .then((response) => {
                presensikelass.push(response.data.data);
            })
            .catch((error) => {
              console.log(error.response.data);

            });
        });

        const formatMemberId = (id_member, Tanggal_Daftar) => {
            const date = new Date(Tanggal_Daftar);
            const year = date.getFullYear().toString().slice(-2);
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const id_member_formatted = id_member.toString().padStart(2, "0");
            return `${year}.${month}.${id_member_formatted}`;
        };

          const formatStrukId = (id, tanggal_booking) => {
              const date = new Date(tanggal_booking);
              const year = date.getFullYear().toString().slice(-2);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const id_presensi = id.toString().padStart(2, '0');
              return `${year}.${month}.${id_presensi}`;
          };

          const formatTanggal = (tanggal_booking) => {
          const parts = tanggal_booking.split('-');
          if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${day}/${month}/${year}`;
          }
            return tanggal_booking;
        };

  
        return {
          presensikelass,
          router,
          generatePDF,
          formatStrukId,
          formatMemberId,
          formatTanggal
        };
      },
    };
    </script>
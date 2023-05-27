<template>
    <div class="card border" style="width: 50%;">
      <div class="card-body">
        <h5 class="card-title">GOFIT</h5>
        <p>Jl. Qlipoth Tree No 5 Yogyakarta</p>
        <h5 class="card-title">STRUK PRESENSI GYM</h5>
        <p class="card-text" v-for="(presensigym, index) in presensigyms" :key="index">
            <strong>No Struk : {{ formatStrukId(presensigym.id, presensigym.tanggal) }}</strong><br>
            <strong>Tanggal : {{ formatTanggal(presensigym.tanggal) }}</strong> <br><br>
        <!-- <strong>ID MEMBER : {{ formatStrukId(presensigym.id_member, presensigym.Tanggal_Daftar) }}</strong><br> -->
          <strong>MEMBER  : {{ formatMemberId(presensigym.id_member, presensigym.Tanggal_Daftar) }} / {{ presensigym.nama_member }}</strong> <br>
          <strong>Slot Waktu  : {{ presensigym.slot_waktu }}</strong> <br>
          
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
          if (presensigyms.length > 0) {
            const doc = new jsPDF();
            const cardWidth = 100; // mm
            const cardHeight = 50; // mm
            const margin = 10; // mm
            const x = margin;
            const y = margin;
            const contentWidth = cardWidth + 2.5 * margin;
            const contentHeight = cardHeight + 1.5 * margin;

            // Draw border around card
            doc.rect(x, y, contentWidth, contentHeight);

            // Add content to card
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16); // Set font size to 16
            doc.text('GOFIT', 15, y + margin);
            doc.setFontSize(12); // Set font size to 16
            doc.setFont('helvetica', 'normal');
            doc.text('Jl. Qlipoth Tree No 5 Yogyakarta', 15, y + margin + 7);
            doc.setFontSize(16); // Set font size to 20
            doc.setFont('helvetica', 'bold');
            doc.text('STRUK PRESENSI GYM', 15, y + margin + 17);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12); // Set font size back to 12

            const firstPresensiGym = presensigyms[0]; // Assuming you only need the first presensi gym

            doc.text('No Struk ', 15, y + margin + 27);
            doc.text(' : ', 16, y + margin + 27);
            doc.text(formatStrukId(firstPresensiGym.id, firstPresensiGym.tanggal), 50, y + margin + 27);

            doc.text('Tanggal: ' , 15, y + margin + 33);
            doc.text(formatTanggal(firstPresensiGym.tanggal), 50, y + margin + 33);

            doc.text('MEMBER: ', 15, y + margin + 45);
            doc.text(formatMemberId(firstPresensiGym.id_member, firstPresensiGym.Tanggal_Daftar) + ' / ' + firstPresensiGym.nama_member, 50, y + margin + 45);

            doc.text('Slot Waktu: ', 15, y + margin + 50);
            doc.text(firstPresensiGym.slot_waktu, 50, y + margin + 50);

            // Auto-print and save PDF
            doc.autoPrint();
            doc.save('struk-presensi-gym.pdf');
          }
        };

  
  
        const presensigyms = reactive([]);
        const router = useRouter();
        const route = useRoute();
        const id = route.params.id;
        // const Tanggal_lahir = route.params.Tanggal_lahir;
        // const id_member = route.params.id_member
    
        onMounted(() => {
          axios
            .get(
              `http://192.168.100.111/p3l/gopit_backend/public/presensigym/${id}`
            )
            .then((response) => {
                presensigyms.push(response.data.data);
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
            // onMounted(() => {
        //     axios
        //         .get(`http://192.168.100.111/p3l/gopit_backend/public/member/${id_member}`)
        //         .then((response) =>{
        //             member.push(response.data.data);
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data);
        //         })
        // })

          const formatStrukId = (id, tanggal) => {
              const date = new Date(tanggal);
              const year = date.getFullYear().toString().slice(-2);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const id_presensi = id.toString().padStart(2, '0');
              return `${year}.${month}.${id_presensi}`;
          };

          const formatTanggal = (tanggal) => {
              const parts = tanggal.split('-');
              if (parts.length === 3) {
                const [year, month, day] = parts;
                return `${year}/${month}/${day}`;
              }
                return tanggal;
          };

  
        return {
          presensigyms,
          router,
          generatePDF,
          formatStrukId,
          formatMemberId,
        //   fetchMember
          formatTanggal
        };
      },
    };
    </script>
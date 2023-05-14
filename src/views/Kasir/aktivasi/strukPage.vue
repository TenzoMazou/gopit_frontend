<template>
    <div class="card border" style="width: 50%;">
      <div class="card-body">
        <h5 class="card-title">GOFIT</h5>
        <p>Jl. Qlipoth Tree No 5 Yogyakarta</p>
        <h5 class="card-title">Member Card</h5>
        <p class="card-text" v-for="(member, index) in members" :key="index">
        <strong>ID MEMBER : {{ formatMemberId(member.id_member, member.Tanggal_Daftar) }}</strong><br>
          <strong>Nama  : {{ member.nama_member }}</strong> <br>
          <strong>Umur  : {{ member.umur }}</strong> <br>
          <strong>Email : {{ member.email }}</strong> <br>
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
          if (members.length > 0) {
            const doc = new jsPDF();
            const cardWidth = 85; // mm
            const cardHeight = 55; // mm
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
            doc.text('Member Card', 15, y + margin + 17);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12); // Set font size back to 12
            doc.text(
              'ID MEMBER  : ' + formatMemberId(members[0].id_member, members[0].Tanggal_Daftar),
              15,
              y + margin + 27
            );
            doc.text('Nama  : ' + members[0].nama_member, 15, y + margin + 37);
            doc.text('Umur  : ' + members[0].umur, 15, y + margin + 47);
            doc.text('Email : ' + members[0].email, 15, y + margin + 57);
  
            // Auto-print and save PDF
            doc.autoPrint();
            doc.save('member-card.pdf');
          }
        };
  
  
        const members = reactive([]);
        const router = useRouter();
        const route = useRoute();
        const id_member = route.params.id_member;
        const Tanggal_lahir = route.params.Tanggal_lahir;
    
        onMounted(() => {
          axios
            .get(
              `http://192.168.100.111/p3l/gopit_backend/public/member/${id_member}/${Tanggal_lahir}`
            )
            .then((response) => {
              members.push(response.data.data);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        });
  
          const formatMemberId = (id_member, Tanggal_Daftar) => {
              const date = new Date(Tanggal_Daftar);
              const year = date.getFullYear().toString().slice(-2);
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const id = id_member.toString().padStart(2, '0');
              return `${year}.${month}.${id}`;
          };
  
    
        return {
          members,
          router,
          generatePDF,
          formatMemberId
        };
      },
    };
    </script>
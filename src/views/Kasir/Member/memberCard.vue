<template>
    <div class="card">
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
                doc.text('GOFIT', 10, 10);
                doc.text('Jl. Qlipoth Tree No 5 Yogyakarta', 10, 20);
                doc.text('Member Card', 10, 30);
                doc.text('ID MEMBER: ' + formatMemberId(members[0].id_member, members[0].Tanggal_Daftar), 10, 40);
                doc.text('Nama: ' + members[0].nama_member, 10, 50);
                doc.text('Umur: ' + members[0].umur, 10, 60);
                doc.text('Email: ' + members[0].email, 10, 70);
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
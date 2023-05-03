<template>
    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">LIST MEMBER</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'kasir.member.create' }" class="btn btn-md btn-success mb-4">New Member</router-link>
                        &nbsp;
                        <v-text-field v-model="searchText" prepend-inner-icon="mdi-magnify" label="Cari Nama Member" placeholder="Enter Member Name" class="custom-text-field-width"></v-text-field>
                        <table class="table table-striped table-bordered mt4">
                            <thead class="thead-dark">
                                <tr class="text-center">
                                    <th scope="col">ID MEMBER</th>
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">UMUR</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">DEPOSIT UANG</th>
                                    <th scope="col">DEPOSIT KELAS</th>
                                    <th scope="col">TANGGAL PENDAFTARAN</th>
                                    <th scope="col">EXPIRED DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id_member) in filteredMember" :key="id_member" class="text-center">
                                    <td>{{ formatMemberId(member.id_member, member.Tanggal_Daftar) }}</td>
                                    <td>{{ member.nama_member }}</td>
                                    <td>{{ member.status }}</td>
                                    <td>{{ member.umur }}</td>
                                    <td>{{ member.email }}</td>
                                    <td>{{ member.deposit_uang }}</td>
                                    <td>{{ member.deposit_kelas }}</td>
                                    <td>{{ member.Tanggal_Daftar }}</td>
                                    <td>{{ member.Expired_Date }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'kasir.member.edit', params: { 
                                            id_member: member.id_member,
                                            Tanggal_lahir: member.Tanggal_lahir
                                            }}" 
                                        class="btn btn-sm btn-primary mr-1 custom-btn"><v-icon size="15">mdi-pencil</v-icon>EDIT</router-link>
                                        &nbsp;
                                        <button @click.prevent="MemberDelete(member.id_member)" class="btn btn-sm btn-danger ml-1 custom-btn"><v-icon size="15">mdi-trash-can-outline</v-icon>DELETE</button>
                                        
                                        <router-link :to="{ name: 'kasir.nembercard.view', params: {
                                                id_member: member.id_member,
                                                Tanggal_lahir: member.Tanggal_lahir
                                            }}" 
                                            class="btn btn-sm btn-success ml-1 custom-btn">Member Card</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useToast } from "vue-toastification";
export default {
    setup() {
        let member = ref([])

        // const token = localStorage.getItem('token')
        
        let toast = useToast();

        const searchText = ref('');

        const filteredMember = computed(() => {
            return member.value.filter(member => {
                return member.nama_member.toLowerCase().includes(searchText.value.toLowerCase())
            })
        })

        onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

            axios.get('http://192.168.100.111/p3l/gopit_backend/public/member')
            .then(response => {
                member.value = response.data.data
                console.log('response', member.value);
            }).catch(error => {
                console.log(error.response.data.data);
            })

            
        })
        
        const formatMemberId = (id_member, Tanggal_Daftar) => {
            const date = new Date(Tanggal_Daftar);
            const year = date.getFullYear().toString().slice(-2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const id = id_member.toString().padStart(2, '0');
            return `${year}.${month}.${id}`;
        };
        //method delete
        function MemberDelete(id_member) {
            axios.delete(`http://192.168.100.111/p3l/gopit_backend/public/member/${id_member}`)
            .then(() => {
                        toast.error("Berhasil Hapus Member !",{
                            timeout: 2000
                        })
                member.value.splice(member.value.indexOf(id_member), 1);
                localStorage.setItem("showToast", "true"); // Set flag to show toast
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        // Check for the flag and show the toastification if it's set
        if (localStorage.getItem("showToast")) {
            toast.error("Berhasil Hapus Member !",{
                timeout: 2000
            });
            localStorage.removeItem("showToast"); // Remove the flag
        }

        

        return {
            member,
            MemberDelete,
            filteredMember,
            searchText,
            formatMemberId
        }
    }
}
</script>
<style>
    .custom-text-field-width {
  width: 500px; /* example width */
}

.custom-btn {
  font-size: 12px;
  padding: 5px 5px;
}
</style>
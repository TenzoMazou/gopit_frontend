<template>
    <div class="wrapper">
        <!-- <div class="logo">
            <img src="https://64.media.tumblr.com/28a1ed7181aefca40749f41bb4f3e877/tumblr_pu31f14vpM1rcufwuo3_540.gif" alt="">
        </div> -->
        <div class="text-center mt-4 name">
            Gofit Administrator
        </div>
        <div v-if="loginFailed" class="alert alert-danger">
            Email atau Password Anda salah.
        </div>
        <form class="p-3 mt-3" @submit.prevent="login">
            <div class="form-group">
                <!-- <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="nama" v-model="pegawai.nama" class="form-control" placeholder="Nama">
                </div> -->
                <v-text-field v-model="pegawai.email" label="Email" variant="underlined"></v-text-field>
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                    {{ validation.email[0] }}
                </div>
                <!-- <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="password" v-model="pegawai.password" class="form-control" placeholder="Password">
                </div> -->
                <v-text-field v-model="pegawai.password" label="Password" variant="underlined"></v-text-field>
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                    {{ validation.password[0] }}
                </div>
                <br>
                <!-- <button type="submit" class="btn mt-3">Login</button> -->
                <v-btn type="submit" block rounded="xl" color="blue">LOGIN</v-btn>
            </div>
            
        </form>
    </div>
</template>

<script>
    import { onMounted } from 'vue';
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import { useToast } from "vue-toastification";
    export default {

        setup() {

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const pegawai = reactive({
                email: '',
                password: '',
            })

            //state validation
            const validation = ref([])

            //state loginFailed
            const loginFailed = ref(null)
            let toast = useToast();

            const errors = reactive({
            usernameErrors: '',
            passwordErrors: '',
            })

            onMounted(() => {
            // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                    window.history.pushState(null, null, window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, null, window.location.href);
                };
            })
            
            //method login
            function login() {
                //send server with axios
                let email = pegawai.email
                let password = pegawai.password
                axios
                    .get('http://192.168.100.111/p3l/gopit_backend/public/pegawai/' + email + "/" + password)
                    .then((response) => {
                        
                        if (response && response.data && response.data.data) {
                            toast.success("Berhasil Login !",{
                            timeout: 2000
                        })
                        let data = response.data.data; // Access 'data' field in response

                        // Check if 'data' is an object
                        let role = data.role;

                        if(role.toLowerCase() === 'admin'){
                                router.push('admin');
                            }else if(role.toLowerCase() === 'kasir'){
                                router.push('kasir');
                            }else if(role.toLowerCase() === 'mo'){
                                router.push('mo');
                            }
                        }

                        //redirect ke halaman dashboard
                        // else if (response.data.user.id !== 1) {
                        // router
                        //     .push({
                        //     name: "user.produk.index",
                        //     })
                        // }
                    

                    //set state loggedIn to true
                    })
                    .catch((error) => {
                        errors.usernameErrors = 'Pegawai not found';
                        errors.passwordErrors = 'Pegawai not found';
                        console.error(error);
                    });
            }

            return {
                pegawai,           // <-- state user
                validation,     // <-- state validation 
                loginFailed,    // <-- state loggedIn
                login           // <-- method login
            }

        }

    }
</script>

<style>
    /* Importing fonts from Google */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

    /* Reseting */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background: #ecf0f3;
        background-image: url("@/assets/wallpaperbetter\ \(5\).jpg");
        background-size:100%
    }

    .wrapper {
        max-width: 350px;
        min-height: 380px;
        margin: 80px auto;
        padding: 40px 30px 30px 30px;
        background-color: #ecf0f3;
        border-radius: 15px;
        box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    }

    .logo {
        width: 80px;
        margin: auto;
    }

    .logo img {
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0px 0px 3px #5f5f5f,
            0px 0px 0px 5px #ecf0f3,
            8px 8px 15px #a7aaa7,
            -8px -8px 15px #fff;
    }

    .wrapper .name {
        font-weight: 600;
        font-size: 1.4rem;
        letter-spacing: 1.3px;
        padding-left: 10px;
        color: #555;
    }

    .wrapper .form-field input {
        width: 100%;
        display: block;
        border: none;
        outline: none;
        background: none;
        font-size: 1.2rem;
        color: #666;
        padding: 10px 15px 10px 10px;
        /* border: 1px solid red; */
    }

    .wrapper .form-field {
        padding-left: 10px;
        margin-bottom: 20px;
        border-radius: 20px;
        box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
    }

    .wrapper .form-field .fas {
        color: #555;
    }

    .wrapper .btn {
        box-shadow: none;
        width: 100%;
        height: 40px;
        background-color: #03A9F4;
        color: #fff;
        border-radius: 25px;
        box-shadow: 3px 3px 3px #b1b1b1,
            -3px -3px 3px #fff;
        letter-spacing: 1.3px;
    }

    .wrapper .btn:hover {
        background-color: #039BE5;
    }

    .wrapper a {
        text-decoration: none;
        font-size: 0.8rem;
        color: #03A9F4;
    }

    .wrapper a:hover {
        color: #039BE5;
    }

    @media(max-width: 380px) {
        .wrapper {
            margin: 30px 20px;
            padding: 40px 15px 15px 15px;
        }
    }
</style>
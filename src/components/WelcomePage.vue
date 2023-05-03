<template>
    <div>
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand fw-bold">GOFIT</a>
                <div class="d-flex justify-content-end">
                    <router-link :to="{ name: 'login' }" class="btn btn-md btn-primary">Login</router-link>
                </div>
            </div>
        </nav>
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://somoskudasai.com/wp-content/uploads/2020/09/portada_dumbbell-5.jpg"
                        class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>SELAMAT DATANG DI GOFIT</h5>
                        <p>Kami memberikan pengalaman Gym yang bermanfaat untuk kesehatan anda</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://dafunda.com/wp-content/uploads/2019/11/Dumbbell-Nan-Kilo-Moteru.jpg"
                        class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>PERALATAN GYM YANG BERKUALITAS</h5>
                        <p>Peralatan Tersedia Dengan Lengkap</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="https://somoskudasai.com/wp-content/uploads/2023/04/portada_lolis-4.jpg"
                        class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>MEMENUHI KEBUTUHAN JASMANI</h5>
                        <p>Kebutuhan anda adalah prioritas bagi kami</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>

<script>

</script>

<style>
    * {
        font-family: "Poppins";
    }

    h2 {
        font-size: 50px;
        -webkit-text-stroke: 2px red;
    }

    .carousel-caption{
        background-color: black;
        opacity: 75%;
        border-radius: 10px;
    }

    .carousel-item {
        max-height: 753px;
    }
</style>
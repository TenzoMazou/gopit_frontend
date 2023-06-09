//import vue router

import {
    createRouter,
    createWebHistory
} from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'welcome',
        component: () => import('@/components/WelcomePage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/LoginPage.vue'),
    },
    // {
    //     path: '/user',
    //     name: 'user.beranda',
    //     component: () => import('@/components/UserDashboard.vue'),
    //     children: [
    //         {
    //             path: "/produk",
    //             name: "user.produk.index",
    //             component: () =>
    //                 import('@/views/User/Produk/indexPage.vue'),
    //         },
    //         {
    //             path: "/transaksi",
    //             name: "user.transaksi.index",
    //             component: () => import("@/views/User/Transaksi/indexPage.vue"),
    //         },
    //         {
    //             path: "/transaksi/create",
    //             name: "user.transaksi.create",
    //             component: () => import("@/views/User/Transaksi/createPage.vue"),
    //         },
    //         {
    //             path: "/transaksi/edit",
    //             name: "user.transaksi.edit",
    //             component: () => import("@/views/User/Transaksi/editPage.vue"),
    //         },
    //         {
    //               path: "/ulasan",
    //               name: "user.ulasan.index",
    //               component: () => import("@/views/User/Ulasan/indexPage.vue"),
    //         },
    //         {
    //             path: "/ulasan/create",
    //             name: "user.ulasan.create",
    //             component: () => import("@/views/User/Ulasan/createPage.vue"),
    //         },
    //         {
    //             path: "/ulasan/edit",
    //             name: "user.ulasan.edit",
    //             component: () => import("@/views/User/Ulasan/editPage.vue"),
    //         },
    //         {
    //             path: "/profile",
    //             name: "user.profile.view",
    //             component: () => import("@/views/User/Profile/profilePage.vue"),
    //         },
    //         {
    //             path: "/profile/edit",
    //             name: "user.profile.edit",
    //             component: () => import("@/views/User/Profile/editPage.vue"),
    //         },
    //     ],
    // },
    {
        path: '/admin',
        name: 'admin.beranda',
        component: () => import('@/components/AdminDashboard.vue'),
        children: [            
            {
                path: "/admininstruktur",
                name: "admin.instruktur.index",
                component: () => import("@/views/Admin/instruktur/indexPage.vue"),
            },
            {
                path: "/instruktur/create",
                name: "admin.instruktur.create",
                component: () => import("@/views/Admin/instruktur/createPage.vue"),
            },
            {
                path: "/instruktur/edit",
                name: "admin.instruktur.edit",
                component: () => import("@/views/Admin/instruktur/editPage.vue"),
            },
        ],
    },
    {
        path: '/kasir',
        name: 'kasir.beranda',
        component: () => import('@/components/KasirDashboard.vue'),
        children: [            
            {
                path: "/kasirMember",
                name: "kasir.member.index",
                component: () => import("@/views/Kasir/Member/indexPage.vue"),
            },
            {
                path: "/kasir/create",
                name: "kasir.member.create",
                component: () => import("@/views/Kasir/Member/createPage.vue"),
            },
            {
                path: "/kasir/edit",
                name: "kasir.member.edit",
                component: () => import("@/views/Kasir/Member/editPage.vue"),
            },
            {
                path: "/kasir/membercard",
                name: "kasir.nembercard.view",
                component: () => import("@/views/Kasir/Member/memberCard.vue")
            },
            // Deposit uang
            {
                path: "/kasir/depositRegulerIndex",
                name: "kasir.depouang.index",
                component: () => import("@/views/Kasir/depoUang/indexPage.vue")
            },
            {
                path: "/kasir/depouang",
                name: "kasir.depouang.create",
                component: () => import("@/views/Kasir/depoUang/createPage.vue")
            },
            //Aktivasi
            {
                path: "/kasir/aktivasi/index",
                name: "kasir.aktivasi.index",
                component: () => import("@/views/Kasir/aktivasi/indexPage.vue")
            },
            //Presensi GYM
            {
                path: "/kasir/presensiGymindex",
                name: "kasir.presensigym.index",
                component: () => import("@/views/Kasir/presensiGym/indexPage.vue")
            },
            {
                path: "/kasir/StrukGym",
                name: "kasir.struk.presensi",
                component: () => import("@/views/Kasir/presensiGym/strukPresensi.vue")
            },
            //PRESENSI KELAS
            {
                path: "/kasir/presensiKelas",
                name: "kasir.presensikelas.index",
                component: () =>import("@/views/Kasir/presensiKelas/indexPage.vue")
            },
            {
                path: "/kasir/strukKelas",
                name: "kasir.struk.kelas",
                component: () => import("@/views/Kasir/presensiKelas/strukPresensiReguler.vue")
            },
            {
                path: "/kasir/strukKelasPaket",
                name: "kasir.struk.kelasPaket",
                component: () => import("@/views/Kasir/presensiKelas/strukPresensiPaket.vue")
            }
            // {
            //     path: "/kasir/aktivasi/create",
            //     name: "kasir.aktivasi.create",
            //     component: () => import("@/views/Kasir/aktivasi/createPage.vue")
            // },
            // {
            //     path: "/kasir/strukuang",
            //     name: "kasir.depouang.struk",
            //     component: () => import("@/views/Kasir/depoUang/strukPage.vue")
            // }
        ],
    },
    {
        path: '/mo',
        name: 'mo.beranda',
        component: () => import('@/components/MODashboard.vue'),
        children: [            
            //Jadwal UMUM
            {
                path: "/mojadwalumum",
                name: "mo.jadwalumum.index",
                component: () => import("@/views/manajerOperasional/jadwalUmum/indexPage.vue"),
            },
            {
                path: "/mo/create",
                name: "mo.jadwalumum.create",
                component: () => import("@/views/manajerOperasional/jadwalUmum/createPage.vue"),
            },
            {
                path: "/mo/edit",
                name: "mo.jadwalumum.edit",
                component: () => import("@/views/manajerOperasional/jadwalUmum/editPage.vue"),
            },
            // Jadwal harian
            {
                path: "/mojadwalharian",
                name: "mo.jadwalharian.index",
                component: () => import("@/views/manajerOperasional/jadwalHarian/indexPage.vue"),
            },
            {
                path: "/mojadwalharian/edit",
                name: "mo.jadwalharian.edit",
                component: () => import("@/views/manajerOperasional/jadwalHarian/editPage.vue"),
            },
            // IJIN INSTRUKTUR
            {
                path: "/moIjinInstrukturindex",
                name: "mo.ijininstruktur.index",
                component: () => import("@/views/manajerOperasional/ijinInstruktur/indexPage.vue"),
            },
            {
                path: "/molaporanPendapatanindex",
                name: "mo.laporanPendapatan.index",
                component: () => import("@/views/manajerOperasional/laporanPendapatan/indexPage.vue"),
            },
            {
                path: "/molaporanKelasindex",
                name: "mo.laporanKelas.index",
                component: () => import("@/views/manajerOperasional/laporanKelas/indexPage.vue"),
            },
            {
                path: "/molaporanGymindex",
                name: "mo.laporanGym.index",
                component: () => import("@/views/manajerOperasional/laporanGym/indexPage.vue"),
            },
            {
                path: "/molaporanInstruktur",
                name: "mo.laporanInstruktur.index",
                component: () => import("@/views/manajerOperasional/laporanInstruktur/indexPage.vue"),
            },
        ],
    }
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;
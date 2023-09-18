import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiBriefcaseOutline,
  mdiCashMultiple,
  mdiPoll,
  mdiShieldAccount,
  mdiViewDashboard,
} from "@mdi/js";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    label: "Kepegawaian",
    icon: mdiAccountMultipleOutline,
    menu: [
      {
        to: "/pegawai/list",
        label: "Data Pegawai",
      },
      {
        to: "/pegawai/kepangkatan/list",
        label: "Kepangkatan",
      },
      {
        to: "/pegawai/kgb/list",
        label: "KGB",
      },
      {
        to: "/pegawai/mutasi/list",
        label: "Mutasi",
      },
      {
        to: "/pegawai/pensiun/list",
        label: "Pensiun",
      },
      {
        to: "/pegawai/pengembangan/list",
        label: "Pengembangan",
      },
    ],
  },
  {
    to: "/kegiatan/list",
    label: "Kegiatan",
    icon: mdiBriefcaseOutline,
  },
  {
    label: "Realisasi Kinerja",
    icon: mdiPoll,
    menu: [
      {
        to: "/pegawai/kgb/list",
        label: "Capaian Tarja",
      },
      {
        label: "Program Unggulan",
      },
    ],
  },
];

import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiCashMultiple,
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
    to: "/pegawai/list",
    label: "Pegawai",
    icon: mdiAccountGroupOutline,
  },
  {
    to: "/pegawai/mutasi/list",
    label: "Mutasi",
    icon: mdiAccountArrowLeftOutline,
  },
  {
    to: "/pegawai/pengembangan/list",
    label: "Pengembangan",
    icon: mdiAccountMultipleOutline,
  },
  {
    to: "/pegawai/kepangkatan/list",
    label: "Kepangkatan",
    icon: mdiBriefcaseAccountOutline,
  },
  {
    to: "/pegawai/pensiun/list",
    label: "Pensiun",
    icon: mdiShieldAccount,
  },
  {
    to: "/pegawai/kgb/list",
    label: "KGB",
    icon: mdiCashMultiple,
  },
];

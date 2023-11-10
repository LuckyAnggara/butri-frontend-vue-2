import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBookMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiBriefcaseOutline,
  mdiCashMultiple,
  mdiPoll,
  mdiShieldAccount,
  mdiViewDashboard,
} from "@mdi/js";
import laporan from "./laporan";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    to: "/pengawasan/list",
    label: "Pengawasan",
    icon: mdiBookMultipleOutline,
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
        to: "/capaian/ikk/list",
        label: "Capaian IKK",
      },
      {
        to: "/capaian/program-unggulan/list",
        label: "Program Unggulan",
      },
    ],
  },
  ...laporan,
];

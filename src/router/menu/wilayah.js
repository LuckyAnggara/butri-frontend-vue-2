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

export default [
  {
    to: "/wilayah/dashboard",
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
        to: "/program-unggulan/list",
        label: "Program Unggulan",
      },
    ],
  },
];

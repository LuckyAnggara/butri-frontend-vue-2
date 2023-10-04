import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiCashMultiple,
  mdiEmailFastOutline,
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
    label: "Anggaran",
    icon: mdiEmailFastOutline,
    icon: mdiAccountMultipleOutline,
    menu: [
      {
        to: "/realisasi-anggaran/list",
        label: "Realisasi Anggaran",
      },
      {
        to: "/dipa/list",
        label: "DIPA",
      },
    ],
  },
  {},
];

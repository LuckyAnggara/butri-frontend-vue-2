import { mdiAdjust, mdiCash, mdiViewDashboard } from "@mdi/js";
import all from "./all";

export default [
  {
    to: "/keuangan/dashboard",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    label: "Realisasi",
    icon: mdiCash,
    menu: [
      {
        to: "/realisasi-anggaran/list",
        label: "Realisasi Anggaran",
      },
      {
        to: "/kinerja-keuangan/list",
        label: "Kinerja Keuangan",
      },
    ],
  },
  {
    to: "/ikpa/list",
    label: "IKPA",
    icon: mdiAdjust,
  },
  ...all,
];

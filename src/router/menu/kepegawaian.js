import {
  mdiAccountMultipleOutline,
  mdiChartBoxOutline,
  mdiViewDashboard,
} from "@mdi/js";
import all from "./all";
import programUnggulan from "./programUnggulan";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    label: "Master Data",
    icon: mdiChartBoxOutline,
    menu: [
      {
        label: "Jabatan",
        to: "/admin/jabatan/list",
      },
    ],
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
  ...programUnggulan,
];

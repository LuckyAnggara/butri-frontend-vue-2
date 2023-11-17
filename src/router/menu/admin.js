import {
  mdiChartBarStacked,
  mdiChartBoxOutline,
  mdiMonitorDashboard,
  mdiViewDashboard,
} from "@mdi/js";
import all from "./all";
import laporan from "./laporan";

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
        label: "IKU",
        to: "/iku/list",
      },
      {
        label: "IKK",
        to: "/ikk/list",
      },
      {
        label: "Program Unggulan",
        to: "/program-unggulan/list",
      },
      {
        label: "DIPA",
        to: "/dipa/list",
      },
    ],
  },
  {
    label: "Monitoring",
    icon: mdiMonitorDashboard,
    menu: [
      // {
      //   label: "Kegiatan",
      //   to: "/monitoring/kegiatan/list",
      // },
      {
        label: "Capaian IKK",
        to: "/monitoring/capaian/ikk/list",
      },
      {
        label: "Pengawasan",
        to: "/monitoring/capaian-pengawasan",
      },
      // {
      //   label: "DIPA",
      //   to: "/dipa/list",
      // },
    ],
  },
  ...all,
  ...laporan,
  {
    label: "Management",
    icon: mdiChartBoxOutline,
    menu: [
      {
        label: "User",
        to: "/user/management",
      },
    ],
  },
];

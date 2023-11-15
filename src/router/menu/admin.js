import {
  mdiChartBarStacked,
  mdiChartBoxOutline,
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

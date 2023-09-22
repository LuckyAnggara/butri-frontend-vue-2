import { mdiChartLine, mdiViewDashboard, mdiChartBoxOutline } from "@mdi/js";
import all from "./all";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    label: "IKU",
    icon: mdiChartLine,
    menu: [
      {
        to: "/iku/list",
        label: "Master",
      },
    ],
  },
  {
    label: "IKK",
    icon: mdiChartBoxOutline,
    menu: [
      {
        to: "/ikk/list",
        label: "Master",
      },
    ],
  },
  ...all,
];

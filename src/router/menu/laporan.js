import { mdiChartBarStacked, mdiChartBoxOutline } from "@mdi/js";
import all from "./all";

export default [
  {
    label: "Laporan",
    icon: mdiChartBoxOutline,
    menu: [
      {
        label: "Download",
        to: "/laporan/download/list",
      },
      {
        label: "Template",
        to: "/laporan/download/list",
      },
    ],
  },
];

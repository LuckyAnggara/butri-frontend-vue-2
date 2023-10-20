import { mdiChartBarStacked, mdiChartBoxOutline } from "@mdi/js";

export default [
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
        label: "DIPA",
        to: "/dipa/list",
      },
    ],
  },
];
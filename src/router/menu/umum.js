import {
  mdiArchiveOutline,
  mdiChairRolling,
  mdiEmailFastOutline,
  mdiViewDashboard,
} from "@mdi/js";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    to: "/persuratan/list",
    label: "Persuratan",
    icon: mdiEmailFastOutline,
  },
  {
    to: "/arsip/list",
    label: "Arsip",
    icon: mdiArchiveOutline,
  },
  {
    label: "BMN",
    icon: mdiChairRolling,
    menu: [
      {
        to: "/iku/list",
        label: "Inventaris",
      },
      {
        to: "/iku/list",
        label: "Mutasi",
      },
    ],
  },
];

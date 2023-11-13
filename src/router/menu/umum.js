import {
  mdiArchiveOutline,
  mdiChairRolling,
  mdiEmailFastOutline,
  mdiViewDashboard,
} from "@mdi/js";
import programUnggulan from "./programUnggulan";

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
  ...programUnggulan,
  // {
  //   label: "BMN",
  //   icon: mdiChairRolling,
  //   menu: [
  //     {
  //       to: "/iku/list",
  //       label: "Inventaris",
  //     },
  //     {
  //       to: "/iku/list",
  //       label: "Mutasi",
  //     },
  //   ],
  // },
];

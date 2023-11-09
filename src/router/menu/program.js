import { mdiViewDashboard } from "@mdi/js";
import all from "./all";
import admin from "./admin";
import laporan from "./laporan";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  ...admin,
  ...all,
  ...laporan,
];

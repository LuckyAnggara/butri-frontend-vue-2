import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiCashMultiple,
  mdiShieldAccount,
  mdiViewDashboard,
} from "@mdi/js";

export default [
  {
    to: "/",
    label: "Dashboard",
    icon: mdiViewDashboard,
  },
  {
    label: "Monitoring",
    icon: mdiAccountGroupOutline,
    menu: [
      {
        to: "/monitoring/internal/list",
        label: "Temuan Internal",
      },
      {
        to: "/monitoring/eksternal",
        label: "Temuan Eksternal",
      },
    ],
  },
];

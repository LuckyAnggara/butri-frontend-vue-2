import {
  mdiAccountArrowLeftOutline,
  mdiAccountGroupOutline,
  mdiAccountMultipleOutline,
  mdiBriefcaseAccountOutline,
  mdiCashMultiple,
  mdiInstagram,
  mdiMonitorAccount,
  mdiShieldAccount,
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
    label: "Pengelolaan",
    icon: mdiMonitorAccount,
    menu: [
      {
        to: "/pengelolaan/media/list",
        label: "Media",
      },
      // {
      //   to: "/",
      //   label: "Teknologi Informasi",
      // },
    ],
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
        to: "/monitoring/eksternal/list",
        label: "Temuan Eksternal",
      },
      // {
      //   to: "/monitoring/pengaduan/list",
      //   label: "Pengaduan",
      // },
    ],
  },
  ...programUnggulan,
];

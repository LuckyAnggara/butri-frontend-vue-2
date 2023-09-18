import { mdiBriefcaseOutline, mdiPoll } from "@mdi/js";

export default [
  {
    to: "/kegiatan/list",
    label: "Kegiatan",
    icon: mdiBriefcaseOutline,
  },
  {
    label: "Realisasi Kinerja",
    icon: mdiPoll,
    menu: [
      {
        label: "Capaian Tarja",
      },
      {
        to: "/program-unggulan/list",
        label: "Program Unggulan",
      },
    ],
  },
];

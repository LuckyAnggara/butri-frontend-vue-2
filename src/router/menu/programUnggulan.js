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
        to: "/capaian/program-unggulan/list",
        label: "Program Unggulan",
      },
    ],
  },
];

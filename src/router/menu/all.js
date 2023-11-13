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
        to: "/capaian/iku/list",
        label: "Capaian IKU",
      },
      {
        to: "/capaian/ikk/list",
        label: "Capaian IKK",
      },

      {
        to: "/capaian/program-unggulan/list",
        label: "Program Unggulan",
      },
    ],
  },
];

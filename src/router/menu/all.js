import { mdiBriefcaseOutline, mdiPoll } from "@mdi/js";

export default [
  {
    to: "/kegiatan/list",
    label: "Kegiatan",
    icon: mdiBriefcaseOutline,
  },
  {
    label: "Risiko",
    icon: mdiBriefcaseOutline,
    menu: [
      {
        to: "/risiko/penetapan-tujuan/list",
        label: "Penetapan Tujuan",
      },
      {
        to: "/risiko/identifikasi/list",
        label: "Identifikasi",
      },
      {
        to: "/risiko/identifikasi/list",
        label: "Analisis",
      },
      {
        to: "/risiko/analisis/list",
        label: "Evaluasi",
      },
      {
        to: "/risiko/penanganan/list",
        label: "Penanganan",
      },
      {
        to: "/risiko/pemantauan/list",
        label: "Pemantauan dan Reviu",
      },
    ],
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

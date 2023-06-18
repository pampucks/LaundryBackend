const mongoose = require("mongoose");

// Membuat Schema Laporan di MongoDB
const Laporan = mongoose.model("Laporan", {
  no_faktur: {
    type: String,
    required: true,
  },
  tanggal_terima: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  dibayar: {
    type: Number,
    required: true,
  },
  kembali: {
    type: Number,
    required: true,
  },
  kode_pelanggan: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

module.exports = Laporan;

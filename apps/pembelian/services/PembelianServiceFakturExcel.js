const xl = require("exceljs");
const BaseServiceExcelColumnResponsive = require("../../base/services/BaseServiceExcelColumnResponsive");
const {
  BASE_CONFIG_EXCEL_FONT_HEADER,
  BASE_CONFIG_EXCEL_FILL_HEADER,
  BASE_CONFIG_EXCEL_BORDER,
} = require("../../base/config");

const PembelianServiceFakturExcel = async (pembelian, pemasok, items) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(`faktur`);

  ws.getCell("D1").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("D2").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("D3").font = BASE_CONFIG_EXCEL_FONT_HEADER;

  ws.getCell("A1").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("A2").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("D1").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("D2").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("D3").fill = BASE_CONFIG_EXCEL_FILL_HEADER;

  ws.getCell("A1").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("A2").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("D1").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("D2").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("D3").border = BASE_CONFIG_EXCEL_BORDER;

  // Detail faktur
  ws.getCell("A1").value = "FAKTUR NO.";
  ws.getCell("A2").value = "TANGGAL";
  ws.getCell("A1").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("A2").font = BASE_CONFIG_EXCEL_FONT_HEADER;

  ws.getCell("B1").value = pembelian.faktur;
  ws.getCell("B2").value = pembelian.tanggal.toISOString().split("T")[0];
  ws.getCell("B1").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("B2").border = BASE_CONFIG_EXCEL_BORDER;

  // Detail pemasok
  ws.getCell("D1").value = "KODE PEMASOK";
  ws.getCell("D2").value = "NAMA PEMASOK";
  ws.getCell("D3").value = "TELEPON PEMASOK";
  ws.getCell("E1").value = pemasok.kodePemasok;
  ws.getCell("E2").value = pemasok.namaPemasok;
  ws.getCell("E3").value = pemasok.teleponPemasok;
  ws.getCell("E1").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("E2").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("E3").border = BASE_CONFIG_EXCEL_BORDER;

  // Detail items
  // Set detail item headers value
  ws.getCell("A5").value = "KODE BARANG";
  ws.getCell("B5").value = "NAMA BARANG";
  ws.getCell("C5").value = "HARGA BELI";
  ws.getCell("D5").value = "JUMLAH BELI";
  ws.getCell("E5").value = "SUBTOTAL";

  // Set detail item headers style font
  ws.getCell("A5").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("B5").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("C5").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("D5").font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell("E5").font = BASE_CONFIG_EXCEL_FONT_HEADER;

  // Set detail item headers style fill
  ws.getCell("A5").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("B5").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("C5").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("D5").fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell("E5").fill = BASE_CONFIG_EXCEL_FILL_HEADER;

  // Set detail item headers style border
  ws.getCell("A5").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("B5").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("C5").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("D5").border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell("E5").border = BASE_CONFIG_EXCEL_BORDER;

  colNumber = 6;
  for (const item of items) {
    ws.getCell(`A${colNumber}`).value = item.kodeBarang;
    ws.getCell(`B${colNumber}`).value = item.namaBarang;
    ws.getCell(`C${colNumber}`).value = item.hargaBeli;
    ws.getCell(`D${colNumber}`).value = item.jumlahBeli;
    ws.getCell(`E${colNumber}`).value = item.subtotal;

    ws.getCell(`A${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
    ws.getCell(`B${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
    ws.getCell(`C${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
    ws.getCell(`D${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
    ws.getCell(`E${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
    colNumber = colNumber + 1;
  }

  // untuk total, dibayar dan kembali
  // header
  ws.getCell(`D${colNumber}`).value = "GRAND TOTAL";
  ws.getCell(`D${colNumber + 1}`).value = "DIBAYAR";
  ws.getCell(`D${colNumber + 2}`).value = "KEMBALI";
  ws.getCell(`D${colNumber}`).font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell(`D${colNumber + 1}`).font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell(`D${colNumber + 2}`).font = BASE_CONFIG_EXCEL_FONT_HEADER;
  ws.getCell(`D${colNumber}`).fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell(`D${colNumber + 1}`).fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell(`D${colNumber + 2}`).fill = BASE_CONFIG_EXCEL_FILL_HEADER;
  ws.getCell(`D${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell(`D${colNumber + 1}`).border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell(`D${colNumber + 2}`).border = BASE_CONFIG_EXCEL_BORDER;

  // value
  ws.getCell(`E${colNumber}`).value = pembelian.total;
  ws.getCell(`E${colNumber + 1}`).value = pembelian.dibayar;
  ws.getCell(`E${colNumber + 2}`).value = pembelian.kembali;
  ws.getCell(`E${colNumber}`).border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell(`E${colNumber + 1}`).border = BASE_CONFIG_EXCEL_BORDER;
  ws.getCell(`E${colNumber + 2}`).border = BASE_CONFIG_EXCEL_BORDER;

  BaseServiceExcelColumnResponsive(ws);
  return wb.xlsx;
};

module.exports = PembelianServiceFakturExcel;

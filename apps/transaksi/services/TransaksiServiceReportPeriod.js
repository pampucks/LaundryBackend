const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const {
  TRANSAKSI_CONFIG_MAIN_TABLE,
  ITEM_BARANG_CONFIG_MAIN_TABLE,
} = require("../config");

const TransaksiServiceReportPeriod = async (startDate, endDate, terms) => {
  let subQuery = await BaseServiceQueryBuilder(TRANSAKSI_CONFIG_MAIN_TABLE)
    .clone()
    .select("no_faktur")
    .whereBetween("tanggal_terima", [startDate, endDate]);

  subQuery = JSON.parse(JSON.stringify(subQuery)).map((item) => item.no_faktur);

  let results = BaseServiceQueryBuilder(ITEM_BARANG_CONFIG_MAIN_TABLE)
    .select(["kode_barang", "nama_barang", "berat", "qty", "subtotal"])
    .whereIn("no_faktur", subQuery);

  if (terms) {
    results = await results
      .sum("qty as qty")
      .sum("subtotal as subtotal")
      .whereILike("kode_barang", `%${terms}%`)
      .orWhereILike("nama_barang", `%${terms}%`)
      .groupBy("kode_barang");
  } else {
    results = await results
      .sum("qty as qty")
      .sum("subtotal as subtotal")
      .groupBy("kode_barang");
  }

  return results;
};

module.exports = TransaksiServiceReportPeriod;

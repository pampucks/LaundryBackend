const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const {
  PEMBELIAN_CONFIG_MAIN_TABLE,
  PEMBELIAN_CONFIG_ITEM_BELI_TABLE,
} = require("../config");

const PembelianServiceReportPeriod = async (startDate, endDate, terms) => {
  let subQuery = await BaseServiceQueryBuilder(PEMBELIAN_CONFIG_MAIN_TABLE)
    .clone()
    .select("faktur")
    .whereBetween("tanggal", [startDate, endDate]);

  subQuery = JSON.parse(JSON.stringify(subQuery)).map((item) => item.faktur);

  let results = BaseServiceQueryBuilder(PEMBELIAN_CONFIG_ITEM_BELI_TABLE)
    .select(["kodeBarang", "namaBarang", "hargaBeli", "jumlahBeli", "subtotal"])
    .whereIn("faktur", subQuery);

  if (terms) {
    results = await results
      .sum("jumlahBeli as jumlahBeli")
      .sum("subtotal as subtotal")
      .whereILike("kodeBarang", `%${terms}%`)
      .orWhereILike("namaBarang", `%${terms}%`)
      .groupBy("kodeBarang");
  } else {
    results = await results
      .sum("jumlahBeli as jumlahBeli")
      .sum("subtotal as subtotal")
      .groupBy("kodeBarang");
  }

  return results;
};

module.exports = PembelianServiceReportPeriod;

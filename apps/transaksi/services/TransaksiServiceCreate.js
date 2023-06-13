const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const {
  TRANSAKSI_CONFIG_MAIN_TABLE,
  ITEM_BARANG_CONFIG_MAIN_TABLE,
} = require("../config");

const TransaksiServiceCreate = async (
  no_faktur,
  tanggal_terima,
  total,
  dibayar,
  kembali,
  kode_pelanggan,
  items
) => {
  const dataTransaksi = {
    no_faktur,
    tanggal_terima,
    total,
    dibayar,
    kembali,
    kode_pelanggan,
  };

  const daftarItemBarang = items.map((item) => {
    return {
      no_faktur,
      kode_barang: item.kode_barang,
      qty: item.qty,
      nama_barang: item.nama_barang,
      hargaSatuan: item.hargaSatuan,
      subtotal: item.subtotal,
    };
  });

  await BaseServiceQueryBuilder.transaction(async (trx) => {
    await BaseServiceQueryBuilder(TRANSAKSI_CONFIG_MAIN_TABLE)
      .insert(dataTransaksi)
      .transacting(trx);

    await BaseServiceQueryBuilder(ITEM_BARANG_CONFIG_MAIN_TABLE)
      .insert(daftarItemBarang)
      .transacting(trx);
  });

  return { ...dataTransaksi, items: daftarItemBarang };
};

module.exports = TransaksiServiceCreate;

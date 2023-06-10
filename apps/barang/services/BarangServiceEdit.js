const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { BARANG_CONFIG_MAIN_TABLE } = require("../config");

const BarangServiceEdit = async (kode_barang, nama_barang) => {
  const data = {
    nama_barang,
  };

  await BaseServiceQueryBuilder(BARANG_CONFIG_MAIN_TABLE)
    .where({ kode_barang })
    .update(data);

  return { kode_barang, ...data };
};

module.exports = BarangServiceEdit;

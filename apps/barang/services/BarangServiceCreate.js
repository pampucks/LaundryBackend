const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { BARANG_CONFIG_MAIN_TABLE } = require("../config");

const BarangServiceCreate = async (kode_barang, nama_barang) => {
  const data = {
    kode_barang,
    nama_barang,
  };

  await BaseServiceQueryBuilder(BARANG_CONFIG_MAIN_TABLE).insert(data);

  return data;
};

module.exports = BarangServiceCreate;

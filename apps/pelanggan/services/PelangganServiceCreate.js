const { PELANGGAN_CONFIG_MAIN_TABLE } = require("../config");
const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");

const PelangganServiceCreate = async (
  kode_pelanggan,
  nama_pelanggan,
  alamat_pelanggan,
  telepon_pelanggan
) => {
  const data = {
    kode_pelanggan,
    nama_pelanggan,
    alamat_pelanggan,
    telepon_pelanggan,
  };
  await BaseServiceQueryBuilder(PELANGGAN_CONFIG_MAIN_TABLE).insert(data);

  return data;
};

module.exports = PelangganServiceCreate;

const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PELANGGAN_CONFIG_MAIN_TABLE } = require("../config");

const PelangganServiceEdit = async (
  kode_pelanggan,
  nama_pelanggan,
  alamat_pelanggan,
  telepon_pelanggan
) => {
  const data = {
    nama_pelanggan,
    alamat_pelanggan,
    telepon_pelanggan,
  };

  await BaseServiceQueryBuilder(PELANGGAN_CONFIG_MAIN_TABLE)
    .where({ kode_pelanggan })
    .update(data);

  return { kode_pelanggan, ...data };
};

module.exports = PelangganServiceEdit;

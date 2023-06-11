const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PELANGGAN_CONFIG_MAIN_TABLE } = require("../config");

const PelangganServiceDelete = async (kode_pelanggan) => {
  await BaseServiceQueryBuilder(PELANGGAN_CONFIG_MAIN_TABLE)
    .where({ kode_pelanggan })
    .del();
  return null;
};

module.exports = PelangganServiceDelete;

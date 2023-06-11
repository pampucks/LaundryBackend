const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PELANGGAN_CONFIG_MAIN_TABLE } = require("../config");

const PelangganServiceGet = async (field, value, many = false) => {
  const results = await BaseServiceQueryBuilder(
    PELANGGAN_CONFIG_MAIN_TABLE
  ).where({ [field]: value });

  if (many) return results;

  return results[0];
};

module.exports = PelangganServiceGet;

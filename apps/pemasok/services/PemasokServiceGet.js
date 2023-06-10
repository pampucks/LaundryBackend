const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PEMASOK_CONFIG_MAIN_TABLE } = require("../config");

const PemasokServiceGet = async (field, value, many = false) => {
  const results = await BaseServiceQueryBuilder(
    PEMASOK_CONFIG_MAIN_TABLE
  ).where({ [field]: value });

  if (many) return results;

  return results[0];
};

module.exports = PemasokServiceGet;

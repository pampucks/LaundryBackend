const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { ITEM_BARANG_CONFIG_MAIN_TABLE } = require("../config");

const TransaksiServiceGetItemBarang = async (field, value, many = false) => {
  const results = await BaseServiceQueryBuilder(
    ITEM_BARANG_CONFIG_MAIN_TABLE
  ).where({ [field]: value });
  if (many) {
    return results;
  }

  return results[0];
};

module.exports = TransaksiServiceGetItemBarang;

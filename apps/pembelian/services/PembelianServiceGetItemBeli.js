const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PEMBELIAN_CONFIG_ITEM_BELI_TABLE } = require("../config");

const PembelianServiceGetItemBeli = async (field, value, many = false) => {
  const results = await BaseServiceQueryBuilder(
    PEMBELIAN_CONFIG_ITEM_BELI_TABLE
  ).where({ [field]: value });
  if (many) {
    return results;
  }

  return results[0];
};

module.exports = PembelianServiceGetItemBeli;

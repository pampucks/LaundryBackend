const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PEMASOK_CONFIG_MAIN_TABLE } = require("../config");

const PemasokServiceDelete = async (kodePemasok) => {
  await BaseServiceQueryBuilder(PEMASOK_CONFIG_MAIN_TABLE)
    .where({ kodePemasok })
    .del();
  return null;
};

module.exports = PemasokServiceDelete;

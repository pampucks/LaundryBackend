const { query } = require("express-validator");
const BaseServicePaginator = require("../../base/services/BaseServicePaginator");
const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PEMASOK_CONFIG_MAIN_TABLE } = require("../config");

const PemasokServiceList = async (terms, page) => {
  const queryBuilder = BaseServiceQueryBuilder(PEMASOK_CONFIG_MAIN_TABLE);

  if (terms) {
    queryBuilder
      .whereILike("kodePemasok", `%${terms}%`)
      .orWhereILike("namaPemasok", `%${terms}%`);
  }

  return {
    ...(await BaseServicePaginator(page, queryBuilder)),
    terms: terms ? terms : "",
  };
};

module.exports = PemasokServiceList;

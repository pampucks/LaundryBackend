const { query } = require("express-validator");
const BaseServicePaginator = require("../../base/services/BaseServicePaginator");
const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PELANGGAN_CONFIG_MAIN_TABLE } = require("../config");

const PelangganServiceList = async (page, terms) => {
  const queryBuilder = BaseServiceQueryBuilder(PELANGGAN_CONFIG_MAIN_TABLE);

  if (terms) {
    queryBuilder
      .whereILike("kode_pelanggan", `%${terms}%`)
      .orWhereILike("nama_pelanggan", `%${terms}%`);
  }

  return {
    ...(await BaseServicePaginator(page, queryBuilder)),
    terms: terms ? terms : "",
  };
};

module.exports = PelangganServiceList;

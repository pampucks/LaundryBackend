const { PEMASOK_CONFIG_MAIN_TABLE } = require("../config");
const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");

const PemasokServiceCreate = async (
  kodePemasok,
  namaPemasok,
  alamatPemasok,
  teleponPemasok
) => {
  const data = {
    kodePemasok,
    namaPemasok,
    alamatPemasok,
    teleponPemasok,
  };
  await BaseServiceQueryBuilder(PEMASOK_CONFIG_MAIN_TABLE).insert(data);

  return data;
};

module.exports = PemasokServiceCreate;

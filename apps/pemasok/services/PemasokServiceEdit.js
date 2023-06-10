const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { PEMASOK_CONFIG_MAIN_TABLE } = require("../config");

const PemasokServiceEdit = async (
  kodePemasok,
  namaPemasok,
  alamatPemasok,
  teleponPemasok
) => {
  const data = {
    namaPemasok,
    alamatPemasok,
    teleponPemasok,
  };

  await BaseServiceQueryBuilder(PEMASOK_CONFIG_MAIN_TABLE)
    .where({ kodePemasok })
    .update(data);

  return { kodePemasok, ...data };
};

module.exports = PemasokServiceEdit;

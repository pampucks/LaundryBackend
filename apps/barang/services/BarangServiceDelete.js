const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { BARANG_CONFIG_MAIN_TABLE } = require("../config");

const BarangServiceDelete = async (kode_barang) => {
  try {
    await BaseServiceQueryBuilder(BARANG_CONFIG_MAIN_TABLE)
      .where({ kode_barang })
      .del();
  } catch (error) {
    console.log(error);
  } finally {
    return null;
  }
};

module.exports = BarangServiceDelete;

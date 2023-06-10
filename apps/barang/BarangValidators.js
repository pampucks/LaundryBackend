const { body } = require("express-validator");
const BarangServiceGet = require("./services/BarangServiceGet");

const BarangValidators = {
  kode_barang: (location = body, forCreate = true, field = "kode_barang") => {
    return location(field)
      .notEmpty()
      .withMessage("Kode barang wajib diisi.")
      .bail()
      .trim()
      .custom(async (value) => {
        const barang = await BarangServiceGet("kode_barang", value);

        if (forCreate && barang) {
          return Promise.reject("Kode barang sudah digunakan.");
        } else if (!forCreate && !barang) {
          return Promise.reject("Kode barang tidak tersedia.");
        }

        return Promise.resolve(value);
      });
  },
  nama_barang: (location = body, field = "nama_barang") => {
    return location(field)
      .notEmpty()
      .withMessage("Nama barang wajib diisi.")
      .bail()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Nama barang minimal 5 karakter.");
  },
};

module.exports = BarangValidators;

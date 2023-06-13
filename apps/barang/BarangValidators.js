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
  hargaSatuan: (location = body, field = "hargaSatuan") => {
    return location(field)
      .notEmpty()
      .withMessage("Harga satuan wajib diisi.")
      .bail()
      .isInt()
      .withMessage("Harga satuan harus angka.")
      .bail()
      .customSanitizer((value) => parseInt(value))
      .custom((value) => {
        if (value <= 0) {
          throw new Error("Harga satuan harus lebih dari 0.");
        }
        return true;
      });
  },
  qty: (location = body, field = "qty") => {
    return location(field)
      .notEmpty()
      .withMessage("qty harus diisi.")
      .bail()
      .isInt()
      .withMessage("qty harus angka.")
      .bail()
      .customSanitizer((value) => parseInt(value))
      .custom((value) => {
        if (value < 1) {
          throw new Error("qty harus di atas 0.");
        }
        return true;
      });
  },
};

module.exports = BarangValidators;

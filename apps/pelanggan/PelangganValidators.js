const { body } = require("express-validator");
const PelangganServiceGet = require("./services/PelangganServiceGet");

const PelangganValidators = {
  kode_pelanggan: (
    location = body,
    forCreate = true,
    field = "kode_pelanggan"
  ) => {
    return location(field)
      .notEmpty()
      .withMessage("Kode pelanggan harus diisi.")
      .bail()
      .trim()
      .custom(async (value) => {
        const pelanggan = await PelangganServiceGet("kode_pelanggan", value);
        if (forCreate && pelanggan) {
          return Promise.reject("Kode pelanggan sudah pernah dibuat.");
        } else if (!forCreate && !pelanggan) {
          return Promise.reject("Kode pelanggan tidak terdaftar.");
        }
        return Promise.resolve(true);
      });
  },
  nama_pelanggan: (location = body, field = "nama_pelanggan") => {
    return location(field)
      .notEmpty()
      .withMessage("Nama pelanggan kosong.")
      .bail()
      .trim()
      .isLength({
        min: 5,
      })
      .withMessage("Nama pelanggan kurang dari 5 karakter.");
  },
  alamat_pelanggan: (location = body, field = "alamat_pelanggan") => {
    return location(field)
      .notEmpty()
      .withMessage("Alamat pelanggan kosong.")
      .bail()
      .trim()
      .isLength({
        min: 10,
      })
      .withMessage("Alamat pelanggan kurang dari 10 karakter.");
  },
  telepon_pelanggan: (location = body, field = "telepon_pelanggan") => {
    return location(field)
      .notEmpty()
      .withMessage("Telepon pelanggan kosong.")
      .bail()
      .trim()
      .isLength({
        min: 10,
        max: 13,
      })
      .withMessage(
        "Telepon pelanggan kurang dari 10 atau lebih dari 13 nomor karakter."
      );
  },
};

module.exports = PelangganValidators;

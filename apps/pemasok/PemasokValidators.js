const { body } = require("express-validator");
const PemasokServiceGet = require("./services/PemasokServiceGet");

const PemasokValidators = {
  kodePemasok: (location = body, forCreate = true, field = "kodePemasok") => {
    return location(field)
      .notEmpty()
      .withMessage("Kode pemasok harus diisi.")
      .bail()
      .trim()
      .custom(async (value) => {
        const pemasok = await PemasokServiceGet("kodePemasok", value);
        if (forCreate && pemasok) {
          return Promise.reject("Kode pemasok sudah pernah dibuat.");
        } else if (!forCreate && !pemasok) {
          return Promise.reject("Kode pemasok tidak terdaftar.");
        }
        return Promise.resolve(true);
      });
  },
  namaPemasok: (location = body, field = "namaPemasok") => {
    return location(field)
      .notEmpty()
      .withMessage("Nama pemasok kosong.")
      .bail()
      .trim()
      .isLength({
        min: 5,
      })
      .withMessage("Nama pemasok kurang dari 5 karakter.");
  },
  alamatPemasok: (location = body, field = "alamatPemasok") => {
    return location(field)
      .notEmpty()
      .withMessage("Alamat pemasok kosong.")
      .bail()
      .trim()
      .isLength({
        min: 10,
      })
      .withMessage("Alamat pemasok kurang dari 10 karakter.");
  },
  teleponPemasok: (location = body, field = "teleponPemasok") => {
    return location(field)
      .notEmpty()
      .withMessage("Telepon pemasok kosong.")
      .bail()
      .trim()
      .isLength({
        min: 10,
        max: 13,
      })
      .withMessage(
        "Telepon pemasok kurang dari 10 atau lebih dari 13 nomor karakter."
      );
  },
};

module.exports = PemasokValidators;

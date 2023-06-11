const PelangganControllers = require("express").Router();
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const BaseValidatorQueryPage = require("../base/validators/BaseValidatorQueryPage");
const { param } = require("express-validator");
const PelangganServiceDelete = require("./services/PelangganServiceDelete");
const PelangganServiceEdit = require("./services/PelangganServiceEdit");
const PelangganServiceGet = require("./services/PelangganServiceGet");
const PelangganServiceList = require("./services/PelangganServiceList");
const PelangganServiceCreate = require("./services/PelangganServiceCreate");
const PelangganValidators = require("./PelangganValidators");

PelangganControllers.post(
  "/",
  [
    UserServiceTokenAuthentication,
    PelangganValidators.kode_pelanggan(),
    PelangganValidators.nama_pelanggan(),
    PelangganValidators.alamat_pelanggan(),
    PelangganValidators.telepon_pelanggan(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pelanggan = await PelangganServiceCreate(
      req.body.kode_pelanggan,
      req.body.nama_pelanggan,
      req.body.alamat_pelanggan,
      req.body.telepon_pelanggan
    );

    return res.status(201).json(pelanggan);
  }
);

PelangganControllers.get(
  "/",
  [
    UserServiceTokenAuthentication,
    BaseValidatorQueryPage(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const daftarPelanggan = await PelangganServiceList(
      req.query.terms,
      req.query.page
    );
    return res.status(200).json(daftarPelanggan);
  }
);

PelangganControllers.get(
  "/:kode_pelanggan",
  [
    UserServiceTokenAuthentication,
    PelangganValidators.kode_pelanggan(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pelanggan = await PelangganServiceGet(
      "kode_pelanggan",
      req.params.kode_pelanggan
    );
    return res.status(200).json(pelanggan);
  }
);

PelangganControllers.put(
  "/:kode_pelanggan",
  [
    UserServiceTokenAuthentication,
    PelangganValidators.kode_pelanggan(param, false),
    PelangganValidators.nama_pelanggan(),
    PelangganValidators.alamat_pelanggan(),
    PelangganValidators.telepon_pelanggan(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pelanggan = await PelangganServiceEdit(
      req.params.kode_pelanggan,
      req.body.nama_pelanggan,
      req.body.alamat_pelanggan,
      req.body.telepon_pelanggan
    );
    return res.status(200).json(pelanggan);
  }
);

PelangganControllers.delete(
  "/:kode_pelanggan",
  [
    UserServiceTokenAuthentication,
    PelangganValidators.kode_pelanggan(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pelanggan = await PelangganServiceDelete(req.params.kode_pelanggan);
    return res.status(200).json(pelanggan);
  }
);

module.exports = PelangganControllers;

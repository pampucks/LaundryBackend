const { param } = require("express-validator");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");

const BarangServiceEdit = require("./services/BarangServiceEdit");
const BarangServiceGet = require("./services/BarangServiceGet");
const BarangServiceCreate = require("./services/BarangServiceCreate");
const BarangServiceList = require("./services/BarangServiceList");
const BarangServiceDelete = require("./services/BarangServiceDelete");
const BaseValidatorQueryPage = require("../base/validators/BaseValidatorQueryPage");
const BarangValidators = require("./BarangValidators");
const BarangControllers = require("express").Router();

BarangControllers.post(
  "/",
  [
    UserServiceTokenAuthentication,
    BarangValidators.kode_barang(),
    BarangValidators.nama_barang(),
    // BarangValidators.qty(),
    BarangValidators.hargaSatuan(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const barang = await BarangServiceCreate(
      req.body.kode_barang,
      req.body.nama_barang,
      // req.body.qty,
      req.body.hargaSatuan
    );
    return res.status(201).json(barang);
  }
);

BarangControllers.get(
  "/",
  [
    UserServiceTokenAuthentication,
    BaseValidatorQueryPage(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const daftarBarang = await BarangServiceList(
      req.query.terms,
      req.query.page
    );
    return res.status(200).json(daftarBarang);
  }
);

BarangControllers.get(
  "/:kode_barang",
  [
    UserServiceTokenAuthentication,
    BarangValidators.kode_barang(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const barang = await BarangServiceGet(
      "kode_barang",
      req.params.kode_barang
    );
    return res.status(200).json(barang);
  }
);

BarangControllers.put(
  "/:kode_barang",
  [
    UserServiceTokenAuthentication,
    BarangValidators.kode_barang(param, false),
    BarangValidators.nama_barang(),
    // BarangValidators.qty(),
    BarangValidators.hargaSatuan(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const barang = await BarangServiceEdit(
      req.params.kode_barang,
      req.body.nama_barang,
      // req.body.qty,
      req.body.hargaSatuan
    );
    return res.status(200).json(barang);
  }
);

BarangControllers.delete(
  "/:kode_barang",
  [
    UserServiceTokenAuthentication,
    BarangValidators.kode_barang(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const barang = await BarangServiceDelete(req.params.kode_barang);
    return res.status(204).json(barang);
  }
);

module.exports = BarangControllers;

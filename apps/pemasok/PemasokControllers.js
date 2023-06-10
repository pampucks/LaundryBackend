const PemasokControllers = require("express").Router();
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const BaseValidatorQueryPage = require("../base/validators/BaseValidatorQueryPage");
const { param } = require("express-validator");
const PemasokServiceDelete = require("./services/PemasokServiceDelete");
const PemasokServiceEdit = require("./services/PemasokServiceEdit");
const PemasokServiceGet = require("./services/PemasokServiceGet");
const PemasokServiceList = require("./services/PemasokServiceList");
const PemasokServiceCreate = require("./services/PemasokServiceCreate");
const PemasokValidators = require("./PemasokValidators");

PemasokControllers.post(
  "/",
  [
    UserServiceTokenAuthentication,
    PemasokValidators.kodePemasok(),
    PemasokValidators.namaPemasok(),
    PemasokValidators.alamatPemasok(),
    PemasokValidators.teleponPemasok(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pemasok = await await PemasokServiceCreate(
      req.body.kodePemasok,
      req.body.namaPemasok,
      req.body.alamatPemasok,
      req.body.teleponPemasok
    );

    return res.status(201).json(pemasok);
  }
);

PemasokControllers.get(
  "/",
  [
    UserServiceTokenAuthentication,
    BaseValidatorQueryPage(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const daftarPemasok = await PemasokServiceList(
      req.query.terms,
      req.query.page
    );
    return res.status(200).json(daftarPemasok);
  }
);

PemasokControllers.get(
  "/:kodePemasok",
  [
    UserServiceTokenAuthentication,
    PemasokValidators.kodePemasok(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pemasok = await PemasokServiceGet(
      "kodePemasok",
      req.params.kodePemasok
    );
    return res.status(200).json(pemasok);
  }
);

PemasokControllers.put(
  "/:kodePemasok",
  [
    UserServiceTokenAuthentication,
    PemasokValidators.kodePemasok(param, false),
    PemasokValidators.namaPemasok(),
    PemasokValidators.alamatPemasok(),
    PemasokValidators.teleponPemasok(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pemasok = await PemasokServiceEdit(
      req.params.kodePemasok,
      req.body.namaPemasok,
      req.body.alamatPemasok,
      req.body.teleponPemasok
    );
    return res.status(200).json(pemasok);
  }
);

PemasokControllers.delete(
  "/:kodePemasok",
  [
    UserServiceTokenAuthentication,
    PemasokValidators.kodePemasok(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pemasok = await PemasokServiceDelete(req.params.kodePemasok);
    return res.status(200).json(pemasok);
  }
);

module.exports = PemasokControllers;

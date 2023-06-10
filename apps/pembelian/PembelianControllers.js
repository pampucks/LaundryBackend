const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");
const PembelianValidators = require("./PembelianValidators");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const PembelianServiceCreate = require("./services/PembelianServiceCreate");
const BaseValidatorFields = require("../base/validators/BaseValidatorFields");
const { query, param } = require("express-validator");
const PembelianServiceList = require("./services/PembelianServiceList");
const PembelianServiceGet = require("./services/PembelianServiceGet");
const PembelianServiceGetItemBeli = require("./services/PembelianServiceGetItemBeli");
const PemasokServiceGet = require("../pemasok/services/PemasokServiceGet");
const PembelianServiceFakturExcel = require("./services/PembelianServiceFakturExcel");
const PembelianServiceReportPeriod = require("./services/PembelianServiceReportPeriod");
const PembelianServiceReportPeriodExcel = require("./services/PembelianServiceReportPeriodExcel");

const PembelianControllers = require("express").Router();

PembelianControllers.post(
  "/",
  [
    UserServiceTokenAuthentication,
    PembelianValidators.faktur(),
    PembelianValidators.tanggal(),
    PembelianValidators.total(),
    PembelianValidators.kodePemasok(),
    PembelianValidators.dibayar(),
    PembelianValidators.kembali(),
    PembelianValidators.items.self(),
    PembelianValidators.items.inner.kode_barang(),
    PembelianValidators.items.inner.nama_barang(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pembelian = await PembelianServiceCreate(
      req.body.faktur,
      req.body.tanggal,
      req.body.total,
      req.body.dibayar,
      req.body.kembali,
      req.body.kodePemasok,
      req.body.items
    );
    res.status(201).json(pembelian);
  }
);

PembelianControllers.get(
  "/",
  [
    UserServiceTokenAuthentication,
    BaseValidatorFields.page(),
    BaseValidatorFields.terms(query),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const daftarPembelian = await PembelianServiceList(
      req.query.terms,
      req.query.page
    );
    return res.status(200).json(daftarPembelian);
  }
);

PembelianControllers.get(
  "/:faktur",
  [
    UserServiceTokenAuthentication,
    PembelianValidators.faktur(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pembelian = await PembelianServiceGet(
      "faktur",
      req.params.faktur,
      false
    );
    const items = await PembelianServiceGetItemBeli(
      "faktur",
      req.params.faktur,
      true
    );

    return res.status(200).json({ ...pembelian, items });
  }
);

PembelianControllers.post(
  "/:faktur/faktur-excel",
  [
    UserServiceTokenAuthentication,
    PembelianValidators.faktur(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const pembelian = await PembelianServiceGet(
      "faktur",
      req.params.faktur,
      false
    );

    const pemasok = await PemasokServiceGet(
      "kodePemasok",
      pembelian.kodePemasok
    );
    const items = await PembelianServiceGetItemBeli(
      "faktur",
      req.params.faktur,
      true
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `${req.params.faktur}-${new Date().getTime()}.xlsx`
    );

    const xlsx = await PembelianServiceFakturExcel(pembelian, pemasok, items);
    await xlsx.write(res);
    return res.end();
  }
);

PembelianControllers.post(
  "/report-period-excel",
  [
    UserServiceTokenAuthentication,
    PembelianValidators.reporting.terms(),
    PembelianValidators.reporting.startDate(),
    PembelianValidators.reporting.endDate(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `Report Pembelian - ${req.body.startDate} sd ${req.body.endDate}.xlsx`
    );

    const results = await PembelianServiceReportPeriod(
      req.body.startDate,
      req.body.endDate,
      req.body.terms
    );

    const xlsx = await PembelianServiceReportPeriodExcel(results);
    await xlsx.write(res);
    return res.end();
  }
);

module.exports = PembelianControllers;

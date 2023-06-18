const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");
const TransaksiValidators = require("./TransaksiValidators");
const BaseValidatorRun = require("../base/validators/BaseValidatorRun");
const BaseValidatorQueryPage = require("../base/validators/BaseValidatorQueryPage");
const TransaksiServiceCreate = require("./services/TransaksiServiceCreate");
const BaseValidatorFields = require("../base/validators/BaseValidatorFields");
const { query, param, body, check } = require("express-validator");
const TransaksiServiceList = require("./services/TransaksiServiceList");
const TransaksiServiceGet = require("./services/TransaksiServiceGet");
const TransaksiServiceGetItemBarang = require("./services/TransaksiServiceGetItemBarang");
const PelangganServiceGet = require("../pelanggan/services/PelangganServiceGet");
const TransaksiServiceFakturExcel = require("./services/TransaksiServiceFakturExcel");
const TransaksiServiceReportPeriod = require("./services/TransaksiServiceReportPeriod");
const TransaksiServiceReportPeriodExcel = require("./services/TransaksiServiceReportPeriodExcel");
const Laporan = require("../../model/laporan");
const flash = require("connect-flash");

const TransaksiControllers = require("express").Router();

TransaksiControllers.post(
  "/",
  [
    UserServiceTokenAuthentication,
    TransaksiValidators.no_faktur(),
    TransaksiValidators.tanggal_terima(),
    TransaksiValidators.total(),
    TransaksiValidators.kode_pelanggan(),
    TransaksiValidators.dibayar(),
    TransaksiValidators.kembali(),
    TransaksiValidators.items.self(),
    TransaksiValidators.items.inner.kode_barang(),
    TransaksiValidators.items.inner.nama_barang(),
    TransaksiValidators.items.inner.hargaSatuan(),
    TransaksiValidators.items.inner.qty(),
    TransaksiValidators.items.inner.subtotal(),
    BaseValidatorRun(),
    body("no_faktur").custom(async (value) => {
      const duplikat = await Laporan.findOne({ no_faktur: value });
      if (duplikat) {
        throw new Error("Faktur Laporan sudah digunakan!");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const transaksi = await TransaksiServiceCreate(
      req.body.no_faktur,
      req.body.tanggal_terima,
      req.body.total,
      req.body.dibayar,
      req.body.kembali,
      req.body.kode_pelanggan,
      req.body.items
    );
    res.status(201).json(transaksi);
    Laporan.insertMany(req.body).then(function () {
      // req.flash("msg", "Data Transaksi berhasil ditambahkan ke Laporan!");
      console.log("Data Transaksi berhasil ditambahkan ke mongoDB");
    });
  }
);

TransaksiControllers.get(
  "/",
  [
    UserServiceTokenAuthentication,
    BaseValidatorFields.page(),
    BaseValidatorFields.terms(query),
    // BaseValidatorQueryPage(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const daftarTransaksi = await TransaksiServiceList(
      req.query.terms,
      req.query.page
    );
    return res.status(200).json(daftarTransaksi);
  }
);

TransaksiControllers.get(
  "/:no_faktur",
  [
    UserServiceTokenAuthentication,
    TransaksiValidators.no_faktur(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const transaksi = await TransaksiServiceGet(
      "no_faktur",
      req.params.no_faktur,
      false
    );
    const items = await TransaksiServiceGetItemBarang(
      "no_faktur",
      req.params.no_faktur,
      true
    );

    return res.status(200).json({ ...transaksi, items });
  }
);

TransaksiControllers.post(
  "/:no_faktur/faktur-excel",
  [
    UserServiceTokenAuthentication,
    TransaksiValidators.no_faktur(param, false),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    const transaksi = await TransaksiServiceGet(
      "no_faktur",
      req.params.no_faktur,
      false
    );

    const pelanggan = await PelangganServiceGet(
      "kode_pelanggan",
      transaksi.kode_pelanggan
    );
    const items = await TransaksiServiceGetItemBarang(
      "no_faktur",
      req.params.no_faktur,
      true
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `${req.params.no_faktur}-${new Date().getTime()}.xlsx`
    );

    const xlsx = await TransaksiServiceFakturExcel(transaksi, pelanggan, items);
    await xlsx.write(res);
    return res.end();
  }
);

TransaksiControllers.post(
  "/report-period-excel",
  [
    UserServiceTokenAuthentication,
    TransaksiValidators.reporting.terms(),
    TransaksiValidators.reporting.startDate(),
    TransaksiValidators.reporting.endDate(),
    BaseValidatorRun(),
  ],
  async (req, res) => {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `Report Transaksi - ${req.body.startDate} sd ${req.body.endDate}.xlsx`
    );

    const results = await TransaksiServiceReportPeriod(
      req.body.startDate,
      req.body.endDate,
      req.body.terms
    );

    const xlsx = await TransaksiServiceReportPeriodExcel(results);
    await xlsx.write(res);
    return res.end();
  }
);

module.exports = TransaksiControllers;

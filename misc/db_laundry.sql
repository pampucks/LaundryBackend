-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2023 at 01:05 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `kode_barang` varchar(20) NOT NULL,
  `nama_barang` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `hargaSatuan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`kode_barang`, `nama_barang`, `qty`, `hargaSatuan`) VALUES
('BRG-001', 'Kemeja Atasan', 0, 15000),
('BRG-002', 'Kebaya Setelan', 0, 30000),
('BRG-003', 'Gaun Setelan', 0, 25000),
('BRG-004', 'Gaun Pengantin', 0, 50000),
('BRG-005', 'Jubah, Gamis', 0, 20000),
('BRG-006', 'Jas Setelan', 0, 30000),
('BRG-007', 'Jaket Bahan, Hoodie', 0, 15000),
('BRG-008', 'Jaket Motor, Parka', 0, 20000),
('BRG-009', 'Jaket Kulit', 0, 40000),
('BRG-010', 'Bed Cover', 0, 20000),
('BRG-011', 'Selimut', 0, 18000),
('BRG-012', 'Sprei Set', 0, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `item_barang`
--

CREATE TABLE `item_barang` (
  `id` int(11) NOT NULL,
  `no_faktur` varchar(20) NOT NULL,
  `kode_barang` varchar(10) NOT NULL,
  `nama_barang` varchar(20) NOT NULL,
  `qty` int(11) NOT NULL,
  `hargaSatuan` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_barang`
--

INSERT INTO `item_barang` (`id`, `no_faktur`, `kode_barang`, `nama_barang`, `qty`, `hargaSatuan`, `subtotal`) VALUES
(173, 'TX-1687084386590', 'BRG-007', 'Jaket Bahan, Hoodie', 1, 15000, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `kode_pelanggan` varchar(20) NOT NULL,
  `nama_pelanggan` varchar(100) NOT NULL,
  `alamat_pelanggan` varchar(100) NOT NULL,
  `telepon_pelanggan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`kode_pelanggan`, `nama_pelanggan`, `alamat_pelanggan`, `telepon_pelanggan`) VALUES
('CUS-001', 'Asta Adji', 'Belakang Pemda', '081355435467'),
('CUS-002', 'Bambang', 'Griya Asri Kab.Bogor', '086574357000');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `no_faktur` varchar(20) NOT NULL,
  `tanggal_terima` date NOT NULL,
  `total` int(11) NOT NULL,
  `dibayar` int(11) NOT NULL,
  `kembali` int(11) NOT NULL,
  `kode_pelanggan` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`no_faktur`, `tanggal_terima`, `total`, `dibayar`, `kembali`, `kode_pelanggan`) VALUES
('TX-1687084386590', '2023-06-18', 15000, 15000, 0, 'CUS-002');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`) VALUES
('Asta', 'Adji', 'asta@gmail.com', '$2a$10$4Qzwcq9KDhYlDTVerbpyfOzN4EgkAJRuwcMhzs4LcVblu8CHBHpIC'),
('Budi', 'Doremi', 'budi@gmail.com', '$2a$10$C9HjbHTxqoVQ7RDSdoo2/u5.f304avRJDesAdQ/ACFLwkRcsjZw6y'),
('Fahmi', 'Ardiansyah', 'fahmi@gmail.com', '$2a$10$FxhX4aKCrF9n9TkzwwIGwO9Ia3Ki83efIF6hhV3P4C21vZXL1EOTK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`kode_barang`);

--
-- Indexes for table `item_barang`
--
ALTER TABLE `item_barang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_beli_ibfk_1` (`no_faktur`),
  ADD KEY `item_beli_ibfk_2` (`kode_barang`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`kode_pelanggan`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`no_faktur`),
  ADD KEY `fk_kodePelanggan` (`kode_pelanggan`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_barang`
--
ALTER TABLE `item_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_barang`
--
ALTER TABLE `item_barang`
  ADD CONSTRAINT `item_barang_ibfk_1` FOREIGN KEY (`no_faktur`) REFERENCES `transaksi` (`no_faktur`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `item_barang_ibfk_2` FOREIGN KEY (`kode_barang`) REFERENCES `barang` (`kode_barang`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_kodePelanggan` FOREIGN KEY (`kode_pelanggan`) REFERENCES `pelanggan` (`kode_pelanggan`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

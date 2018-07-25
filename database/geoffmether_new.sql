-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2018 at 08:54 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geoffmether_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `dependencies`
--

CREATE TABLE `dependencies` (
  `dependencies_id` int(11) NOT NULL,
  `operation_name_call` varchar(255) NOT NULL,
  `operation_name` varchar(100) NOT NULL,
  `integration_status` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL,
  `comments` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dependencies`
--

INSERT INTO `dependencies` (`dependencies_id`, `operation_name_call`, `operation_name`, `integration_status`, `date_added`, `comments`) VALUES
(8, 'operation', 'Some', 'Specified', '2018-07-22 02:11:06', 'some comments'),
(9, 'OPP:SER:OPP', 'OPP:SER:OPP', 'In Build', '2018-07-22 02:17:59', 'some comets here ');

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `operation_id` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `product_type` varchar(100) NOT NULL,
  `service` varchar(255) NOT NULL,
  `operation` varchar(100) NOT NULL,
  `operation_name` varchar(255) NOT NULL,
  `service_status` varchar(50) NOT NULL,
  `deployment` varchar(200) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`operation_id`, `product`, `product_type`, `service`, `operation`, `operation_name`, `service_status`, `deployment`, `date_added`) VALUES
(13, 'Pro', 'UI', 'SER', 'OPP', 'OPP:SER:OPP', 'Idea', 'D5 (New)', '2018-07-22 02:14:25'),
(14, 'PRO', 'UI', 'SER', 'OPE', 'PRO:UI:SER:OPE', 'Idea', 'D5 (New)', '2018-07-22 02:17:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dependencies`
--
ALTER TABLE `dependencies`
  ADD PRIMARY KEY (`dependencies_id`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`operation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dependencies`
--
ALTER TABLE `dependencies`
  MODIFY `dependencies_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `operation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
